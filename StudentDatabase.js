import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, {useEffect, useState} from "react";
import {TextTitle, TopBar} from "../components/Reuse";
import {COLORS} from "../styles/Colors";
import Icon from "react-native-vector-icons/AntDesign";
import {
	doc,
	setDoc,
	updateDoc,
	onSnapshot,
	collection,
} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {updateStudentStatus} from "../firebase/FbFirestore";

const myIcon = <Icon name="caretup" size={16} color={COLORS.grayColor} />;

const StudentDatabase = ({route, navigation}) => {
	const {courseId, selectedCourse} = route.params;

	const [courseStudents, setCourseStudents] = useState([]);

	const markAttendence = async (text) => {
		if (text == "mark") {
			const data = courseStudents.map((item) => {
				item = {...item, present: "present"};
				return item;
			});
			updateStudentStatus(data, courseId)
				.then((value) => {
					console.log("okay");
				})
				.catch((err) => {
					Alert.alert(err.message);
				});
		} else {
			const data = courseStudents.map((item) => {
				item = {...item, present: "request"};
				return item;
			});
			updateStudentStatus(data, courseId)
				.then((value) => {
					console.log("okay");
				})
				.catch((err) => {
					Alert.alert(err.message);
				});
		}
	};

	const selectOneStudent = async (val, text) => {
		if (text == "mark") {
			const data = courseStudents.map((item) => {
				if (item.studentMail === val.studentMail) {
					item = {...item, present: "present"};
				}
				return item;
			});

			updateStudentStatus(data, courseId)
				.then((value) => {
					console.log("okay");
				})
				.catch((err) => {
					Alert.alert(err.message);
				});
		} else {
			const data = courseStudents.map((item) => {
				if (item.studentMail === val.studentMail) {
					item = {...item, present: "request"};
				}
				return item;
			});
			updateStudentStatus(data, courseId)
				.then((value) => {
					console.log("okay");
				})
				.catch((err) => {
					Alert.alert(err.message);
				});
		}
	};

	useEffect(() => {
		onSnapshot(doc(db, "courses", courseId), (doc) => {
			// console.log("just Students array ", doc.data().students);
			setCourseStudents(doc.data().students);
		});
	}, []);

	return (
		<View>
			<View style={styles.headStyle}>
				<TopBar text="Present Student" navigation={navigation} />
			</View>
			<ScrollView contentContainerStyle={styles.wrapper}>
				<View style={styles.topView}>
					<View style={styles.studentIdView}>
						<View style={styles.courseNameWrapper}>
							<Text style={styles.text}>
								{selectedCourse.length > 20
									? selectedCourse.slice(0, 19) + "..."
									: selectedCourse}
							</Text>
							<Text style={[styles.text, {fontSize: 14}]}>
								Students
							</Text>
						</View>
					</View>
					<View style={styles.updateAllBtnWrapper}>
						<TouchableOpacity
							style={[styles.studentIdView, styles.mark]}
							onPress={() => markAttendence("mark")}
						>
							<Text style={[styles.text, styles.whiteText]}>
								Mark All
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.studentIdView,
								styles.mark,
								{
									marginTop: 5,
									backgroundColor: COLORS.grayColor,
								},
							]}
							onPress={() => markAttendence("unmark")}
						>
							<Text style={[styles.text, styles.whiteText]}>
								Unmark All
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{marginTop: 10}}>
					{courseStudents.length ? (
						courseStudents.map((data, i) => (
							<StudentInfo
								key={i}
								data={data}
								onPress={selectOneStudent}
							/>
						))
					) : (
						<Text style={styles.nullText}>
							No students presents
						</Text>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export default StudentDatabase;

const StudentInfo = ({data, onPress}) => {
	const seeDate = () => {
		alert(Date.now());
	};
	return (
		<View style={styles.topView}>
			<TouchableOpacity
				style={[
					styles.studentIdView,
					styles.studentIdViewStyle2,
					data.present == "present"
						? {backgroundColor: COLORS.lightBlue}
						: {backgroundColor: COLORS.grayColor},
				]}
				onPress={() => seeDate(data)}
			>
				<Text style={styles.text}>{data.studentMail}</Text>
			</TouchableOpacity>
			<View style={{width: "30%"}}>
				{data.present == "present" ? (
					<TouchableOpacity
						onPress={() => onPress(data, "unmark")}
						style={[
							styles.studentIdView,
							styles.mark,
							data.present == "present"
								? {backgroundColor: COLORS.grayColor}
								: "",
						]}
					>
						<Text
							style={[
								styles.text,
								styles.whiteText,
								{color: COLORS.red},
							]}
						>
							unmark
						</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						onPress={() => onPress(data, "mark")}
						style={[
							styles.studentIdView,
							styles.mark,
							data.present == "present"
								? {backgroundColor: COLORS.grayColor}
								: "",
						]}
					>
						<Text style={[styles.text, styles.whiteText]}>
							mark
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

// //presentDate
const styles = StyleSheet.create({
	headStyle: {
		height: "24%",
		justifyContent: "center",
		backgroundColor: COLORS.lightBlue,
		paddingTop: 30,
		paddingHorizontal: 10,
	},
	wrapper: {
		backgroundColor: COLORS.lightYellow,
		width: "100%",
		minHeight: 100,
		padding: 10,
		borderRadius: 5,
	},
	topView: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	courseNameWrapper: {
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
	},
	studentIdView: {
		width: "65%",
		backgroundColor: COLORS.brown,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		minHeight: 40,
		borderRadius: 5,
	},
	updateAllBtnWrapper: {
		width: "30%",
	},

	studentIdViewStyle2: {
		backgroundColor: COLORS.lightBlue,
	},
	mark: {
		width: "100%",
		backgroundColor: COLORS.red,
	},
	text: {
		fontSize: 15,
		fontFamily: "Helvetica-Bold",
		color: COLORS.white,
	},
	whiteText: {
		color: COLORS.white,
	},
	extraStyle: {
		justifyContent: "space-evenly",
	},
	btnText: {
		fontSize: 12,
		fontFamily: "Helvetica-Bold",
		color: COLORS.white,
	},
	nullText: {
		textAlign: "center",
		marginVertical: 10,
		fontFamily: "Helvetica-Bold",
		fontSize: 16,
	},
});
