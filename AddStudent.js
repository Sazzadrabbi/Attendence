import {StyleSheet, Text, View, ScrollView, Alert} from "react-native";
import React, {useState} from "react";
import {COLORS} from "../styles/Colors";
import {
	ButtonComp,
	Input,
	SelectPositionComp,
	TopBar,
} from "../components/Reuse";
import {DepartmentComp} from "./SelectDepartment";
import {bgColor} from "./StudentList";
import {addDoc, collection, Timestamp} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {
	commonWrapper,
	pageTopbarStye,
} from "../components/similarstyles/SimillarStyles";
import {batchData, courseData, semisterData} from "../data/alldata";
import {addDataToFirestore} from "../firebase/FbFirestore";
import {createUserWithFb} from "../firebase/FbAuth";

export const yearmodelstyle = {
	top: "40%",
};
const coursemodelstyle = {
	top: "48%",
	marginBottom: 20,
};

const AddStudent = ({navigation}) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [id, setId] = useState("");
	const [selectedbatch, setSelectedBatch] = useState("");
	const [selectedcourse, setSelectedCourse] = useState("");
	const [showyearmodel, setYearShowModel] = useState(false);
	const [showcoursemodel, setCourseShowModel] = useState(false);

	const selectBatch = (t) => {
		setSelectedBatch(t);
	};
	const selectCourse = (t) => {
		setSelectedCourse(t);
	};
	const addStudent = async () => {
		let e = "@";
		let com = ".com";

		let fields = [
			name,
			email,
			password,
			phone,
			id,
			selectedbatch,
			selectedcourse,
		];
		let okay = fields.every(Boolean);

		if (!okay) {
			return alert("please fill all the field");
		}

		if (!email.includes(e) || !email.includes(com)) {
			return alert("invalid email format");
		}

		if (phone.length > 11 || phone.length < 11) {
			return alert("invalid phone number!");
		}

		let info = {
			name,
			email,
			phone,
			id,
			batch: selectedbatch,
			course: selectedcourse,
			createAt: Timestamp.fromDate(new Date()),
		};
		const collectionName = "students";

		const userData = await createUserWithFb(email, password);
		if (userData.user) {
			addDataToFirestore(collectionName, info)
				.then((value) => {
					navigation.navigate("studentlist");
				})
				.catch((err) => {
					alert(err.message);
				});
		} else {
			Alert.alert("something went wrong");
		}
	};
	return (
		<View style={styles.root}>
			<View style={pageTopbarStye}>
				<TopBar navigation={navigation} text="Add Student" />
			</View>
			<ScrollView
				contentContainerStyle={[commonWrapper, styles.scrollHeight]}
				showsVerticalScrollIndicator={false}
			>
				<Input placeholder="name" setValue={setName} />
				<Input placeholder="email" setValue={setEmail} />
				<Input
					placeholder="password"
					setValue={setPassword}
					secureTextEntry={true}
				/>
				<Input placeholder="phone" setValue={setPhone} />
				<Input placeholder="id" setValue={setId} />
				<View style={styles.selectwrapper}>
					<DepartmentComp
						setShowModel={setYearShowModel}
						text="select batch"
						value={selectedbatch}
					/>
				</View>
				<DepartmentComp
					setShowModel={setCourseShowModel}
					text="select courses"
					value={selectedcourse}
				/>
				<ButtonComp
					click={addStudent}
					text="Submit"
					bgColor={bgColor}
				/>

				{showyearmodel && (
					<SelectPositionComp
						setShowModel={setYearShowModel}
						text="Select Year"
						data={batchData}
						extrastyle={yearmodelstyle}
						selectValue={selectBatch}
					/>
				)}
				{showcoursemodel && (
					<SelectPositionComp
						setShowModel={setCourseShowModel}
						text="Select Courses"
						data={courseData}
						extrastyle={coursemodelstyle}
						selectValue={selectCourse}
					/>
				)}
			</ScrollView>
		</View>
	);
};

export default AddStudent;

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},

	selectwrapper: {
		marginVertical: 5,
	},
});
