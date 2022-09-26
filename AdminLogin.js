import {Alert, Image, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {middleContentStyle} from "../components/similarstyles/SimillarStyles";
import {ButtonComp, Input} from "../components/Reuse";
import {COLORS} from "../styles/Colors";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase/firebase";
import {signinWithFb} from "../firebase/FbAuth";

const lockImg = require("../../assets/images/lock.png");

const AdminLogin = ({navigation}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const bgColor = {
		backgroundColor: COLORS.brown,
		borderRadius: 5,
		width: "100%",
		marginTop: 10,
		height: 45,
	};
	const btnTextStyle = {
		color: "#fff",
		fontSize: 16,
	};

	const adminLogin = async () => {
		let fields = [email, password];
		let okay = fields.every(Boolean);
		if (!okay) {
			return alert("please email and password required!");
		}
		signinWithFb(email, password)
			.then((data) => {
				navigation.navigate("admindashboard");
			})
			.catch((err) => {
				Alert.alert("invalid email or password");
			});
	};
	return (
		<View style={middleContentStyle}>
			<View style={styles.imageWrapper}>
				<Image source={lockImg} style={styles.imgStyle} />
				<Text style={styles.text}>AdminLogin</Text>
			</View>
			<View>
				<Input placeholder="email" setValue={setEmail} />
				<Input
					placeholder="password"
					setValue={setPassword}
					secureTextEntry={true}
				/>
				<ButtonComp
					bgColor={bgColor}
					btnTextStyle={btnTextStyle}
					text="Login"
					click={adminLogin}
				/>
			</View>
		</View>
	);
};

export default AdminLogin;

const styles = StyleSheet.create({
	imageWrapper: {
		alignItems: "center",
	},
	imgStyle: {
		width: 100,
		height: 100,
		borderRadius: 100 / 2,
	},
	text: {
		marginVertical: 10,
		fontSize: 20,
	},
});
