import {View, ScrollView, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {ButtonComp, SelectPositionComp, TopBar} from "../components/Reuse";
import {COLORS} from "../styles/Colors";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../firebase/firebase";

import {loadText} from "./CourseList";
import {
	detailsmodelStyle,
	extrapadding,
	root,
	topStyle,
	T_List,
	wrapper,
} from "../components/T_List";

export const btnWrapperStyle = {
	paddingVertical: 20,
};

export const slistContainer = {
	borderWidth: 2,
	borderColor: COLORS.lightBlue,
	borderRadius: 5,
	padding: 8,
	marginVertical: 8,
};
export const bgColor = {
	borderWidth: 2,
	borderColor: COLORS.brown,
	width: "100%",
	borderRadius: 10,
};

const StudentList = ({navigation}) => {
	const [students, setStudents] = useState([]);
	const [showdetails, setShowDetails] = useState(false);
	const [oneDetails, setOneDetails] = useState(null);

	const addStudent = () => {
		navigation.navigate("addstudent");
	};

	const getStudents = () => {
		const cRef = collection(db, "students");
		const q = query(cRef, orderBy("createAt", "desc"));

		onSnapshot(q, (querySnapshot) => {
			let sts = [];
			querySnapshot.forEach((doc) => {
				sts.push(doc.data());
			});
			setStudents(sts);
		});
	};

	const getSinglelist = (d) => {
		setOneDetails(d);
	};

	useEffect(() => {
		getStudents();
		return () => {};
	}, []);
	return (
		<View style={root}>
			<View style={topStyle}>
				<TopBar navigation={navigation} text="Student List" />
			</View>
			<ScrollView
				contentContainerStyle={wrapper}
				showsVerticalScrollIndicator={false}
			>
				{students.length == 0 ? (
					<Text style={loadText}>No data</Text>
				) : (
					students.map((d, i) => (
						<T_List
							key={i}
							value={d}
							getSinglelist={getSinglelist}
							setShowDetails={setShowDetails}
						/>
					))
				)}
			</ScrollView>

			<View style={[btnWrapperStyle, extrapadding]}>
				<ButtonComp
					text="Add Student"
					click={addStudent}
					bgColor={bgColor}
				/>
			</View>
			{showdetails && (
				<SelectPositionComp
					setShowModel={setShowDetails}
					text="Student Details"
					singleData={oneDetails}
					setShowDetails={setShowDetails}
					extrastyle={detailsmodelStyle}
				/>
			)}
		</View>
	);
};

export default StudentList;
