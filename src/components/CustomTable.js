import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {totalSize} from 'react-native-dimension';
import {Table, Row, Rows} from 'react-native-table-component';
import {colors} from '../utils/constants/colors';

export default class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: this.props.tableHead,
      tableData: this.props.tableData,
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={{...styles.text, color: colors.white}}
          />
          <ScrollView>
            <Rows
              data={state.tableData}
              textStyle={styles.text}
              style={{
                backgroundColor: '#ff',
              }}
            />
          </ScrollView>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingBottom: 70, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#537791'},
  text: {margin: 6, fontSize: totalSize(1.3)},
});
