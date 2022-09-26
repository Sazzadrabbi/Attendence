import {StyleSheet, Text, View, ScrollView} from "react-native";
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
import {batchData, courseData, teacherData} from "../data/alldata";
import {addDataToFirestore} from "../firebase/FbFirestore";

const couserModel = {
	top: "35%",
};
const yearmodelstyle = {
	top: "45%",
};
const coursemodelstyle = {
	top: "55%",
};

const AddCourse = ({navigation}) => {
	const [code, setCode] = useState("");
	const [teacherEmail, setTeacherEmail] = useState("");
	const [courseName, setCourseName] = useState("");
	const [selectedbatch, setSelectedBatch] = useState("");
	const [selectedteacher, setSelectedTeacher] = useState("");
	const [selectedcourse, setSelectedCourse] = useState("");

	const [showbatchrmodel, setSimisterShowModel] = useState(false);
	const [showteachermodel, setYearShowModel] = useState(false);
	const [showcoursemodel, setCourseShowModel] = useState(false);

	const selectBatch = (t) => {
		setSelectedBatch(t);
	};
	const selectTeacher = (t) => {
		setSelectedTeacher(t);
	};
	const selectCourse = (t) => {
		setSelectedCourse(t);
	};
	const addStudent = async () => {
		let teacheremail = teacherEmail.toLowerCase();
		let e = "@";
		let com = ".com";
		let fields = [
			code,
			courseName,
			teacherEmail,
			selectedteacher,
			selectedbatch,
			selectedcourse,
		];
		let okay = fields.every(Boolean);
		if (!okay) {
			return alert("please fill all the field");
		}

		if (!teacherEmail.includes(e) || !teacherEmail.includes(com)) {
			return alert("invalid email format");
		}

		let info = {
			code,
			course: selectedcourse,
			batch: selectedbatch,
			teacher: selectedteacher,
			teacheremail,
			students: [],
			totalstudents: 100,
			courseName,
			createAt: Timestamp.fromDate(new Date()),
		};

		const collectionName = "courses";

		addDataToFirestore(collectionName, info)
			.then((value) => {
				navigation.navigate("courselist");
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	return (
		<View style={styles.root}>
			<View style={pageTopbarStye}>
				<TopBar navigation={navigation} text="Add Course" />
			</View>
			<ScrollView
				contentContainerStyle={commonWrapper}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.selectwrapper}>
					<View style={{marginBottom: 10}}>
						<Input
							placeholder="teacher email"
							setValue={setTeacherEmail}
						/>
					</View>
					<View style={{marginBottom: 10}}>
						<Input
							placeholder="Course Name "
							setValue={setCourseName}
						/>
					</View>
					<View style={{marginBottom: 10}}>
						<Input placeholder="coures Code" setValue={setCode} />
					</View>
					<DepartmentComp
						setShowModel={setSimisterShowModel}
						text="select courses"
						value={selectedcourse}
					/>
					<DepartmentComp
						setShowModel={setYearShowModel}
						text="select batch"
						value={selectedbatch}
					/>
				</View>
				<DepartmentComp
					setShowModel={setCourseShowModel}
					text="select teacher"
					value={selectedteacher}
				/>

				<ButtonComp
					click={addStudent}
					text="Submit"
					bgColor={bgColor}
				/>

				{showbatchrmodel && (
					<SelectPositionComp
						setShowModel={setSimisterShowModel}
						text="Select course"
						data={courseData}
						selectValue={selectCourse}
						extrastyle={couserModel}
					/>
				)}
				{showteachermodel && (
					<SelectPositionComp
						setShowModel={setYearShowModel}
						text="Select batch"
						data={batchData}
						extrastyle={yearmodelstyle}
						selectValue={selectBatch}
					/>
				)}
				{showcoursemodel && (
					<SelectPositionComp
						setShowModel={setCourseShowModel}
						text="Select teacher"
						data={teacherData}
						extrastyle={coursemodelstyle}
						selectValue={selectTeacher}
					/>
				)}
			</ScrollView>
		</View>
	);
};

export default AddCourse;

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},

	selectwrapper: {
		marginVertical: 5,
	},
});
