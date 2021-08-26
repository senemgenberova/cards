import { useState, useEffect } from "react";
import _ from "lodash";

export default function useFilter(
  mockList,
  filterProps,
  filters,
  setFilters,
  setFiltersToStore
) {
  const [list, setList] = useState([]);

  const appliedFilters = filterProps.filter(({ value }) => !_.isEmpty(value));

  const operations = {
    handleChange: (name) => (e) => {
      setFilters((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    },
    handleCheckBoxChange: (name) => (e) => {
      let {
        target: { checked, value },
      } = e;

      setFilters((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((c) => c !== value),
      }));
    },
    filterList: () => {
      const filteredList = mockList.filter((c) => {
        for (const { attr, value, filterFunc } of appliedFilters) {
          if (attr !== "undefined" && c.hasOwnProperty(attr)) {
            const itemValue = c[attr].toString();

            if (itemValue.indexOf(value) === -1) return false;
          }

          if (filterFunc !== "undefined" && typeof filterFunc === "function") {
            const isFiltered = filterFunc(c);
            if (!isFiltered) return false;
          }
        }

        return true;
      });

      return filteredList;
    },
  };

  useEffect(() => {
    setFiltersToStore(filters);

    setList(operations.filterList());
  }, [filters]);

  return {
    handleChange: operations.handleChange,
    handleCheckBoxChange: operations.handleCheckBoxChange,
    list,
  };
}
