import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../utils/constants/colors';

const DropDown = ({
  list,
  extraData,
  setState,
  stateKey,
  newStyles,
  placeholder = 'Select an item',
  zIndex,
  zIndexInverse
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(list);

  const clickHandler = item => {
    setValue(item);
    setState({...extraData, [stateKey]: item()});
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={clickHandler}
      setItems={setItems}
      placeholderStyle={{color: colors.disableColor, opacity: 0.5}}
      arrowIconStyle={{opacity: 0.3}}
      style={{
        ...newStyles,
        width: '90%',
        alignSelf: 'center',
        borderColor: colors.gray,
      }}
      dropDownContainerStyle={{
        width: '90%',
        alignSelf: 'center',
        borderColor: colors.gray,
      }}
      placeholder={placeholder}
      zIndex={zIndex}
      zIndexInverse={zIndexInverse}
    />
  );
};

export default DropDown;
