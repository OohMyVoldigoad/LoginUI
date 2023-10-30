    import { View, Text, Image , Pressable, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native'
    import React, { useState, useEffect } from 'react'
    import { SafeAreaView } from "react-native-safe-area-context";
    import COLORS from '../constants/colors';
    import { Ionicons } from "@expo/vector-icons";
    import Checkbox from "expo-checkbox";
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { useNavigation } from '@react-navigation/native';
    import axios from 'axios';

    {/* dev */}

    const Login = ({ route }) => {
        const navigation = useNavigation();
        const [isPasswordShown, setIsPasswordShown] = useState(true);
        const [isChecked, setIsChecked] = useState(false);

        {/* Auth */}
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [errorMessage, setErrorMessage] = useState(null);

        const loginHandler = async () => {
            try {
            // Kirim permintaan login ke server
            const response = await axios.post('http://10.170.5.149:8000/api/login-pelanggan', {
                email: email,
                password: password,
            });
        
            // Handle respons dari server di sini
            console.log('Login berhasil:', response.data);
            // Simpan token ke AsyncStorage
            const userToken = response.data.token;
            await AsyncStorage.setItem('userToken', userToken);
            navigation.navigate('Home', { loginSuccess: true });
            } catch (error) {
                console.error('Login gagal:', error);
                setErrorMessage('Username or password is wrong');
            }
        };
        
        const [isRegisterSuccessModalVisible, setRegisterSuccessModalVisible] = useState(false);

        useEffect(() => {
            if (route.params && route.params.registerSuccess) {
            // Jika registerSuccess bernilai true, tampilkan modal "Register berhasil"
            setRegisterSuccessModalVisible(true);
            }
        }, [route.params]);

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            marginVertical: 12,
                            color: COLORS.black
                        }}>
                            Hi Welcome Back ! 👋
                        </Text>

                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                        }}>Hello again you have been missed!</Text>
                            {errorMessage && (
                                <Text style={{
                                    fontSize: 16,
                                    color: 'red',
                                    marginTop: 12
                                }}>
                                    {errorMessage}
                                </Text>
                            )}
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Email address</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Enter your email'
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor={COLORS.black}
                                keyboardType='email-address'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                        
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Password</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Enter your password'
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={isPasswordShown}
                                style={{
                                    width: "100%"
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {
                                    isPasswordShown == true ? (
                                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={COLORS.black} />
                                    )
                                }

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 6
                    }}>
                        <Checkbox
                            style={{ marginRight: 8 }}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? COLORS.primary : undefined}
                        />

                        <Text>Remenber Me</Text>
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10
                            }}
                        />
                        <Text style={{ fontSize: 14 }}>Or Login with</Text>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10
                            }}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => console.log("Pressed")}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 52,
                                borderWidth: 1,
                                borderColor: COLORS.grey,
                                marginRight: 4,
                                borderRadius: 10
                            }}
                        >
                            <Image
                                source={require("../assets/facebook.png")}
                                style={{
                                    height: 36,
                                    width: 36,
                                    marginRight: 8
                                }}
                                resizeMode='contain'
                            />

                            <Text>Facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => console.log("Pressed")}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 52,
                                borderWidth: 1,
                                borderColor: COLORS.grey,
                                marginRight: 4,
                                borderRadius: 10
                            }}
                        >
                            <Image
                                source={require("../assets/google.png")}
                                style={{
                                    height: 36,
                                    width: 36,
                                    marginRight: 8
                                }}
                                resizeMode='contain'
                            />

                            <Text>Google</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginVertical: 22
                    }}>
                        <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                        <Pressable
                            onPress={() => navigation.navigate("Signup")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: "bold",
                                marginLeft: 6
                            }}>Register</Text>
                        </Pressable>
                    </View>
                </View>
                <Modal
                        visible={isRegisterSuccessModalVisible}
                        animationType="slide"
                        transparent={true}
                    >
                        <View>
                        <Text>Register berhasil!</Text>
                        <TouchableOpacity onPress={() => setRegisterSuccessModalVisible(false)}>
                            <Text>Tutup</Text>
                        </TouchableOpacity>
                        </View>
                    </Modal>
            </SafeAreaView>
        )
    }

    export default Login

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        },
        label: {
        fontSize: 16,
        marginBottom: 8,
        },
        input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        paddingHorizontal: 8,
        },
        loginButton: {
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 4,
        },
        buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        },
    });