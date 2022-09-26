import {View, ScrollView, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {bgColor, btnWrapperStyle} from "./StudentList";
import {ButtonComp, SelectPositionComp, TopBar} from "../components/Reuse";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {
	detailsmodelStyle,
	extrapadding,
	root,
	topStyle,
	T_List,
	wrapper,
} from "../components/T_List";

export const loadText = {
	textAlign: "center",
	marginTop: 20,
};

const CourseList = ({navigation}) => {
	const [courses, setCourses] = useState([]);
	const [showdetails, setShowDetails] = useState(false);
	const [oneDetails, setOneDetails] = useState(null);

	const addCourse = () => {
		navigation.navigate("addcourse");
	};
	const getCourses = () => {
		const cRef = collection(db, "courses");
		const q = query(cRef, orderBy("createAt", "desc"));

		onSnapshot(q, (querySnapshot) => {
			let crs = [];
			querySnapshot.forEach((doc) => {
				crs.push(doc.data());
			});
			setCourses(crs);
		});
	};

	const getSinglelist = (d) => {
		setOneDetails(d);
	};

	useEffect(() => {
		getCourses();
		return () => {};
	}, []);

	return (
		<View style={root}>
			<View style={topStyle}>
				<TopBar navigation={navigation} text="Course List" />
			</View>
			<ScrollView
				contentContainerStyle={wrapper}
				showsVerticalScrollIndicator={false}
			>
				{courses.length == 0 ? (
					<Text style={loadText}>No data...</Text>
				) : (
					courses.map((d, i) => (
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
					text="Add Course"
					bgColor={bgColor}
					click={addCourse}
				/>
			</View>

			{showdetails && (
				<SelectPositionComp
					setShowModel={setShowDetails}
					text="Course Details"
					singleData={oneDetails}
					setShowDetails={setShowDetails}
					extrastyle={detailsmodelStyle}
				/>
			)}
		</View>
	);
};

export default CourseList;
