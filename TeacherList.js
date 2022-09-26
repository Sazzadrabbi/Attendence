import {View, ScrollView, Text} from "react-native";
import React, {useState, useEffect} from "react";
import {bgColor, btnWrapperStyle} from "./StudentList";
import {ButtonComp, SelectPositionComp, TopBar} from "../components/Reuse";
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

const TeacherList = ({navigation}) => {
	const [allteacher, setAllTeacher] = useState([]);
	const [showdetails, setShowDetails] = useState(false);
	const [oneDetails, setOneDetails] = useState(null);

	const addTeacher = () => {
		navigation.navigate("addteacher");
	};

	const getallTeachers = () => {
		const cRef = collection(db, "teachers");
		const q = query(cRef, orderBy("createAt", "desc"));

		onSnapshot(q, (querySnapshot) => {
			let trs = [];
			querySnapshot.forEach((doc) => {
				trs.push(doc.data());
			});
			setAllTeacher(trs);
		});
	};

	const getSinglelist = (d) => {
		setOneDetails(d);
	};

	useEffect(() => {
		getallTeachers();
		return () => {};
	}, []);

	return (
		<View style={root}>
			<View style={topStyle}>
				<TopBar navigation={navigation} text="Teacher List" />
			</View>
			<ScrollView
				contentContainerStyle={wrapper}
				showsVerticalScrollIndicator={false}
			>
				{allteacher.length == 0 ? (
					<Text style={loadText}>No data</Text>
				) : (
					allteacher.map((d, i) => (
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
					text="Add Teacher"
					click={addTeacher}
					bgColor={bgColor}
				/>
			</View>

			{showdetails && (
				<SelectPositionComp
					setShowModel={setShowDetails}
					text="Teacher Details"
					singleData={oneDetails}
					setShowDetails={setShowDetails}
					extrastyle={detailsmodelStyle}
				/>
			)}
		</View>
	);
};

export default TeacherList;
