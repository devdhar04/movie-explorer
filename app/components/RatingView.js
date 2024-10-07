import React, { useState,useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MoviesContext } from '../screens/movies/MoviesContext';

const RatingView = ({ movieId,isVisible, onClose, onSubmit }) => {

    const [selectedRating, setSelectedRating] = useState(0);
    const { postRating } = useContext(MoviesContext);

    const handleStarPress = (rating) => {
        setSelectedRating(rating);
    };

    const handleSubmit = () => {
        postRating(movieId,selectedRating);
        onClose(); // Close the modal after submitting
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Rate this Movie</Text>

                    <View style={styles.starContainer}>
                        {/* Render 10 stars */}
                        {Array.from({ length: 10 }).map((_, index) => {
                            const starRating = index + 1;
                            return (
                                <TouchableOpacity key={index} onPress={() => handleStarPress(starRating)}>
                                    <FontAwesome
                                        name={starRating <= selectedRating ? 'star' : 'star-o'}
                                        size={24}
                                        color={starRating <= selectedRating ? '#FFD700' : '#CCCCCC'}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={styles.ratingText}>Selected Rating: {selectedRating}/10</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    ratingText: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#CCCCCC',
    },
    submitButton: {
        backgroundColor: '#FFD700',
    },
    buttonText: {
        fontSize: 16,
    },
});

export default RatingView;
