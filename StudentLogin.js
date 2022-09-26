import {Alert, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {
	ButtonComp,
	Input,
	SelectPositionComp,
	TextTitle,
} from "../components/Reuse";
import {COLORS} from "../styles/Colors";
import {
	btnWrapper,
	labelText,
	passwordContainerStyle,
} from "../components/similarstyles/SimillarStyles";
import {DepartmentComp} from "./SelectDepartment";
import {batchData, courseData} from "../data/alldata";
import {signinWithFb} from "../firebase/FbAuth";

const container = {
	flex: 1,
	flexDirection: "column",
	justifyContent: "center",
	paddingHorizontal: 20,
};

const btnTextStyle = {
	color: COLORS.white,
	fontSize: 16,
	fontFamily: "Helvetica-Bold",
};

const bgColor = {
	width: "50%",
	backgroundColor: COLORS.brown,
	height: 40,
};

const topHeadStyle = {
	marginBottom: 30,
};

const batchWrapper = {
	marginTop: 15,
};

const batchmodelstyle = {
	top: "66%",
	width: "100%",
	left: 0,
};
const StudentLogin = ({navigation}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showbatchModel, setShowBatchModel] = useState(false);
	const [showCourseModel, setShowCourseModel] = useState(false);
	const [studentBatch, setStudentBatch] = useState("");
	const [studentcourse, setStudentCourse] = useState("");

	const selectBatch = (t) => {
		setStudentBatch(t);
	};
	const selectCourse = (t) => {
		setStudentCourse(t);
	};

	const studentLogin = () => {
		let fields = [email, password, studentBatch, studentcourse];
		let okay = fields.every(Boolean);

		if (!okay) {
			return alert("please fill all the fields");
		}

		signinWithFb(email, password)
			.then((data) => {
				navigation.navigate("studentpresent", {
					studentBatch,
					studentcourse,
				});
			})
			.catch((err) => {
				Alert.alert("invalid email and password");
			});
	};
	return (
		<View style={container}>
			<View style={topHeadStyle}>
				<TextTitle />
			</View>
			<View>
				<InputComp
					text="Email :"
					placeholder="email"
					setValue={setEmail}
				/>
				<View style={passwordContainerStyle}>
					<InputComp
						text="Password :"
						placeholder="password"
						setValue={setPassword}
						secureTextEntry={true}
					/>
				</View>

				<View style={batchWrapper}>
					<DepartmentComp
						setShowModel={setShowBatchModel}
						text="select batch"
						value={studentBatch}
					/>
				</View>
				<View style={batchWrapper}>
					<DepartmentComp
						setShowModel={setShowCourseModel}
						text="select course"
						value={studentcourse}
					/>
				</View>
				<View style={btnWrapper}>
					<ButtonComp
						text="Login"
						bgColor={bgColor}
						btnTextStyle={btnTextStyle}
						click={studentLogin}
					/>
				</View>

				{showbatchModel && (
					<SelectPositionComp
						setShowModel={setShowBatchModel}
						text="Select Batch"
						data={batchData}
						selectValue={selectBatch}
						extrastyle={batchmodelstyle}
					/>
				)}
				{showCourseModel && (
					<SelectPositionComp
						setShowModel={setShowCourseModel}
						text="Select Course"
						data={courseData}
						selectValue={selectCourse}
						extrastyle={batchmodelstyle}
					/>
				)}
			</View>
		</View>
	);
};

export default StudentLogin;

export const InputComp = ({text, setValue, placeholder, secureTextEntry}) => {
	return (
		<View>
			<Text style={labelText}>{text}</Text>
			<Input
				setValue={setValue}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});
