import React from "react"
import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import RepositoryItem from "./RepositoryItem"
import RepositorySorter from "./RepositorySorter"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  icon: {
    padding: 5,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedSort, onSortChange, searchKeyword, setSearchKeyword } =
      this.props

    return (
      <View>
        <View style={styles.searchBarContainer}>
          <Icon name="search" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />
          {searchKeyword.length > 0 && (
            <TouchableOpacity onPress={() => setSearchKeyword("")}>
              <Icon name="close" size={20} color="#666" style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
        <RepositorySorter
          selectedSort={selectedSort}
          setSelectedSort={onSortChange}
        />
      </View>
    )
  }

  render() {
    const { repositories, onPressRepository, onEndReach } = this.props
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPressRepository(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    )
  }
}
