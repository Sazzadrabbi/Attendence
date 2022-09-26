import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	Alert,
} from "react-native";
import React, {useEffect, useState} from "react";
import {ButtonComp, DateComp, TextTitle} from "../components/Reuse";
import {selectStyle} from "../components/similarstyles/SimillarStyles";
import {COLORS} from "../styles/Colors";
import {onAuthStateChanged} from "firebase/auth";
import {
	collection,
	query,
	where,
	onSnapshot,
	updateDoc,
	doc,
	Timestamp,
} from "firebase/firestore";
import {auth, db} from "../firebase/firebase";
import {getMatchCourses, updateStudentStatus} from "../firebase/FbFirestore";

const StudentPresent = ({route, navigation}) => {
	const {studentBatch, studentcourse} = route.params;
	const d = new Date();

	const [selectedCourse, setSelectedCourse] = useState("");
	const [mycourses, setMyCourses] = useState([]);
	const [courseId, setCourseId] = useState("0");
	const [alreadystudentExist, setAlreadyStudentExists] = useState(null);

	const validuser = auth?.currentUser?.email;

	// const msgTime = lastMsg?.createdAt?.toDate().toLocaleTimeString();

	const bgColor = {
		backgroundColor: COLORS.brown,
		borderRadius: 5,
		width: "50%",
		height: 40,
	};
	const btnTextStyle = {
		color: "#fff",
		fontSize: 16,
	};

	const selectCourse = async (title, id) => {
		setSelectedCourse(title);
		setCourseId(id);

		let res = mycourses.filter((course) => course.id == id);
		let sts;
		res.forEach((d) => {
			sts = d.value.students;
		});
		setAlreadyStudentExists(sts);
	};

	const markAttendence = async () => {
		if (!selectedCourse) {
			return Alert.alert("Select a Course");
		}

		let value = alreadystudentExist?.filter(
			(studentVal) =>
				studentVal.studentMail == validuser &&
				studentVal.presentDate.toDate().toLocaleDateString() ==
					d.toLocaleDateString()
		);

		console.log("have already", value.length);

		if (value.length >= 1) {
			navigation.navigate("studentattendence", {
				selectedCourse,
				courseId,
				alreadyPresentToday: true,
			});
			Alert.alert("already present done today");
		}

		if (value.length == 0) {
			let data = [
				...alreadystudentExist,
				{
					studentMail: validuser,
					present: "request",
					presentDate: Timestamp.fromDate(new Date()),
				},
			];
			updateStudentStatus(data, courseId)
				.then((value) => {
					navigation.navigate("studentattendence", {
						selectedCourse,
						courseId,
						alreadyPresentToday: false,
					});
				})
				.catch((err) => {
					Alert.alert(err.message);
				});

			// navigation.navigate("studentattendence", {
			// 	selectedCourse,
			// 	courseId,
			// 	alreadyPresentToday: true,
			// });
		}
	};

	useEffect(() => {
		getMatchCourses(studentBatch, studentcourse, setMyCourses);
	}, []);

	return (
		<View style={styles.root}>
			<View style={styles.headContainer}>
				<TextTitle />
				<DateComp />
			</View>
			<ScrollView contentContainerStyle={styles.alignStyle}>
				<Text style={[styles.textStyle, styles.text]}>
					Batch : {studentBatch}
				</Text>
				<Text style={[styles.textStyle, styles.text]}>
					Course : {studentcourse}
				</Text>
				<View style={selectStyle}>
					<Text style={styles.text}>Select Course</Text>
				</View>
				{mycourses.length ? (
					mycourses.map((data) => (
						<Course
							key={data.id}
							data={data}
							select={selectCourse}
							someStyle={
								data.id == courseId ? styles.extraStyle : ""
							}
						/>
					))
				) : (
					<Text style={styles.emptyText}>No courses available</Text>
				)}
			</ScrollView>

			<View style={styles.footerBtnContainer}>
				<ButtonComp
					text="Mark Attendence"
					bgColor={bgColor}
					btnTextStyle={btnTextStyle}
					click={markAttendence}
				/>
			</View>
		</View>
	);
};

export default StudentPresent;

export const Course = ({data, select, someStyle}) => {
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={styles.courseContainer}
			onPress={() => {
				select(data.value.courseName, data.id);
			}}
		>
			<Text style={styles.courseTitle}>{data.value.courseName}</Text>
			<View style={[styles.rightView, someStyle]}></View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		paddingTop: 30,
		paddingBottom: 15,
	},
	headContainer: {
		justifyContent: "center",
		height: "25%",
	},
	alignStyle: {
		alignItems: "center",
		paddingVertical: 20,
	},
	text: {
		fontSize: 16,
		fontFamily: "Helvetica-Bold",
	},
	textStyle: {
		marginBottom: 10,
	},

	footerBtnContainer: {
		alignItems: "center",
		height: "10%",
		justifyContent: "center",
	},

	// Course comp styles

	courseContainer: {
		backgroundColor: COLORS.grayColor,
		width: "80%",
		minHeight: 35,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
		marginBottom: 8,
		padding: 5,
	},
	courseTitle: {
		maxWidth: "80%",
		fontFamily: "Helvetica-Bold",
	},
	rightView: {
		backgroundColor: "#fff",
		width: 20,
		height: 20,
		borderRadius: 100 / 2,
	},

	emptyText: {
		textAlign: "center",
		fontSize: 16,
		marginTop: 10,
		fontFamily: "Helvetica-Bold",
	},

	extraStyle: {
		backgroundColor: "red",
	},
});
