import React, { createContext, useState, useEffect } from 'react';

import { searchMovies, fetchMovies } from '../../services/api';
import { getUniqueMovies } from '../../utils/utils'

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const onSearch = (searchKeyword) => {
        //setIsLoading(true);
        setKeyword(searchKeyword);
    };

    const onLoadMore = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const setPageSize = (currentPage, totalPage) => {
        if (currentPage < totalPage) {
            setHasMore(true);
        }
        else {
            setHasMore(false);
        }
    }

    useEffect(() => {
        // Debounce the API call
            if (keyword.length > 0) {
                searchMovies(keyword,page)
                    .then((result) => {
                        setError(null);
                        setMovies(result.results);
                        setPageSize(result.page, result.total_pages);
                    })
                    .catch((err) => {
                        setError(err);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } else {
                //setMovies([]);
                setPage(1);
            }
        
    }, [keyword]);

    
    useEffect(() => {
        if (keyword.length < 1) {
            fetchMovies(page)
                .then((result) => {
                    setError(null);
                    if (result) {

                        if (page == 1) {
                            setMovies(result.results);
                        } else {
                            setMovies((prevMovies) => {
                                const combinedMovies = [...prevMovies, ...result.results];
                                console.log('result', prevMovies.length, combinedMovies.length);
                                const uniqueMovies = getUniqueMovies(combinedMovies);
                                return uniqueMovies;
                            });
                        }
                        setPageSize(result.page, result.total_pages);
                    }
                })
                .catch((err) => {
                    //setError(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [keyword, page]);

    return (
        <SearchContext.Provider
            value={{ isLoading, error, movies, keyword, search: onSearch, loadMoreMovies: onLoadMore }}
        >
            {children}
        </SearchContext.Provider>
    );
};