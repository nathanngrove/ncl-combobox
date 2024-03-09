import React, { useState, useContext, useRef } from "react";

type HighlightedTermState = {
	index: number;
	direction: "up" | "down" | null;
};

type ComboboxProps = {
	children: React.ReactNode;
};

type ComboboxContextObject = {
	filteredList: Array<string>;
	setFilteredList: React.Dispatch<React.SetStateAction<Array<string>>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	highlightedTerm: HighlightedTermState;
	setHighlightedTerm: React.Dispatch<
		React.SetStateAction<HighlightedTermState>
	>;
	isFocused: boolean;
	setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
	listContainerRef: React.RefObject<HTMLDivElement> | null;
};

const ComboboxContext = React.createContext<ComboboxContextObject>({
	filteredList: [],
	setFilteredList: () => {},
	searchTerm: "",
	setSearchTerm: () => {},
	highlightedTerm: { index: -1, direction: null },
	setHighlightedTerm: () => {},
	isFocused: false,
	setIsFocused: () => {},
	listContainerRef: null,
});

export function useCombobox() {
	return useContext(ComboboxContext);
}

type ComboboxContextProviderProps = {
	children: React.ReactNode;
};

const ComboboxContextProvider = ({
	children,
}: ComboboxContextProviderProps) => {
	const [filteredList, setFilteredList] = useState<Array<string>>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [highlightedTerm, setHighlightedTerm] =
		useState<HighlightedTermState>({ index: -1, direction: null });
	const [isFocused, setIsFocused] = useState(false);

	const listContainerRef = useRef<HTMLDivElement>(null);

	const ComboboxContextObject = {
		filteredList,
		setFilteredList,
		searchTerm,
		setSearchTerm,
		highlightedTerm,
		setHighlightedTerm,
		isFocused,
		setIsFocused,
		listContainerRef,
	};

	return (
		<ComboboxContext.Provider value={ComboboxContextObject}>
			{children}
		</ComboboxContext.Provider>
	);
};

const Combobox = ({ children }: ComboboxProps) => {
	return <ComboboxContextProvider>{children}</ComboboxContextProvider>;
};

export default Combobox;
