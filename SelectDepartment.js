import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {middleContentStyle} from "../components/similarstyles/SimillarStyles";
import {COLORS} from "../styles/Colors";
import DownIcon from "react-native-vector-icons/AntDesign";
import {ButtonComp, SelectPositionComp} from "../components/Reuse";

const SelectDepartment = () => {
	const bgColor = {
		width: "100%",
		backgroundColor: COLORS.lightBlue,
		height: 50,
		borderRadius: 5,
	};
	const btnTextStyle = {
		color: COLORS.white,
		fontFamily: "Helvetica-Bold",
		fontSize: 16,
	};
	return (
		<View style={middleContentStyle}>
			<DepartmentComp text="SelectDepartment" />
			<DepartmentComp text="Batch" />
			<ButtonComp
				text="Dive Inside"
				bgColor={bgColor}
				btnTextStyle={btnTextStyle}
			/>
		</View>
	);
};

export default SelectDepartment;

export const DepartmentComp = ({text, setShowModel, value}) => (
	<TouchableOpacity
		style={styles.selectContainer}
		onPress={() => setShowModel(true)}
	>
		{value?.length < 1 ? (
			<Text style={styles.text}>{text}</Text>
		) : (
			<Text style={styles.text}>{value}</Text>
		)}

		<DownIcon size={16} name="caretdown" color={COLORS.ligthBlack} />
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	selectContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: COLORS.lightGary,
		height: 50,
		paddingHorizontal: 10,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: COLORS.lightBlue,
		marginBottom: 10,
	},
	text: {
		fontSize: 16,
		fontFamily: "Helvetica-Bold",
	},
});
