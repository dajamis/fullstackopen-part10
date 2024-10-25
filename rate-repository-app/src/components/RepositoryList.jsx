import React, { useState } from "react"
import { ActivityIndicator } from "react-native"
import { useDebounce } from "use-debounce"
import useRepositories from "../hooks/useRepositories"
import { RepositoryListContainer } from "./RepositoryListContainer"
import { useNavigate } from "react-router-native"

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState("latest")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 1000)
  const navigate = useNavigate()

  const getSortingOptions = () => {
    switch (selectedSort) {
      case "highest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" }
      case "lowest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" }
      default:
        return { orderBy: "CREATED_AT", orderDirection: "DESC" }
    }
  }

  const { orderBy, orderDirection } = getSortingOptions()
  const { repositories, loading, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
    first: 5,
  })

  const onEndReach = () => {
    fetchMore()
  }

  const handlePressRepository = (id) => {
    navigate(`/${id}`)
  }

  if (loading) {
    return <ActivityIndicator size="large" />
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSort={selectedSort}
      onSortChange={setSelectedSort}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onPressRepository={handlePressRepository}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
