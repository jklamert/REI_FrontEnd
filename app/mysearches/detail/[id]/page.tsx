"use client";

import {
  EXPENSE,
  EXPENSE_MUTATION,
  SEARCH,
  SEARCH_MUTATION,
  SEARCH_QUERY,
} from "#app/_types/allTypes";
import { isPositive, isWholeNum } from "#app/_utils/validators";
import ActualSidebar from "#components/actualSidebar";
import Header from "#components/header";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import {
  Button,
  Card,
  Label,
  RangeSlider,
  Spinner,
  TextInput,
} from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
// import {getClient} from "#app/context/ApolloClient";

type searchDetailProps = {
  params: { id: string };
  searchParams: object;
};

export default function Index(props: searchDetailProps): JSX.Element {
  return (
    <div>
      <Header activeNav={-1} />
      <div className="flex dark:bg-gray-900">
        <main
          style={{ height: "100%" }}
          className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]"
        >
          <SearchDetailPage id={props.params.id} />
        </main>
        <div className="order-1">
          <ActualSidebar />
        </div>
      </div>
    </div>
  );
}

function SearchDetailPage(props: { id: string }): JSX.Element {
  const [editModeCriteria, setEditModeCriteria] = useState(false);
  const [editModeExpense, setEditModeExpense] = useState(false);

  const [
    updateExpense,
    { loading: updateExpenseLoading, error: updateExpenseError },
  ] = useMutation(
    EXPENSE_MUTATION,
    {
      refetchQueries: [SEARCH_QUERY],
    }
    // { update: updateCache }
  );
  const [
    updateSearchCriteria,
    { loading: updateCriteriaLoading, error: updateCriteriaError },
  ] = useMutation(
    SEARCH_MUTATION,
    {
      refetchQueries: [SEARCH_QUERY],
    }
    // { update: updateCache }
  );

  const { data, error, loading } = useQuery(SEARCH_QUERY, {
    variables: { id: parseInt(props.id) },
    // if the cache data from SSR is only partial, this will still trigger a network request
    fetchPolicy: "cache-first",
  });

  // const updateCache = (cache, { data }) => {
  //   // Fetch the todos from the cache
  //   const existingTodos = cache.readQuery({
  //     query: SEARCH_QUERY,
  //   });
  //   // Add the new todo to the cache
  //   const newTodo = data.expense[0];
  //   cache.writeQuery({
  //     query: GET_MY_TODOS,
  //     data: { todos: [newTodo, ...existingTodos.todos] },
  //   });
  // };

  //Search Criteria State
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [beds, setBeds] = useState("");
  const [isBedsValid, setIsBedsValid] = useState(true);

  const [maxBath, setMaxBath] = useState("");
  const [isMaxBathValid, setIsMaxBathValid] = useState(true);

  const [minBath, setMinBath] = useState("");
  const [isMinBathValid, setIsMinBathValid] = useState(true);

  //Expense State
  const [taxes, setTaxes] = useState("");
  const [isTaxValid, setIsTaxValid] = useState(true);

  const [insurance, setInsurance] = useState("");
  const [isInsuranceValid, setIsInsuranceValid] = useState(true);

  const [water, setWater] = useState("");
  const [isWaterValid, setIsWaterValid] = useState(true);

  const [sewer, setSewer] = useState("");
  const [isSewerValid, setIsSewerValid] = useState(true);

  const [garbage, setGarbage] = useState("");
  const [isGarbageValid, setIsGarbageValid] = useState(true);

  const [electric, setElectric] = useState("");
  const [isElectricValid, setIsElectricValid] = useState(true);

  const [gas, setGas] = useState("");
  const [isGasValid, setIsGasValid] = useState(true);

  const [hoa, setHoa] = useState("");
  const [isHoaValid, setIsHoaValid] = useState(true);

  const [lot, setLot] = useState("");
  const [isLotValid, setIsLotValid] = useState(true);

  const [vacancy, setVacancy] = useState("");
  const [isVacancyValid, setIsVacancyValid] = useState(true);

  const [repairs, setRepairs] = useState("");
  const [isRepairsValid, setIsRepairsValid] = useState(true);

  const [capex, setCapex] = useState("");
  const [isCapexValid, setIsCapexValid] = useState(true);

  const [management, setManagement] = useState("");
  const [isManagementValid, setIsManagementValid] = useState(true);

  const [mortgage, setMortgage] = useState("");
  const [isMortgageValid, setIsMortgageValid] = useState(true);

  /**
   * Method to return the expense data back to the source.
   * @param searchData
   */
  function setExpenseData(data: EXPENSE) {
    setTaxes(data?.taxes ? data?.taxes + "" : "");
    setInsurance(data?.insurance ? data?.insurance + "" : "");
    setWater(data?.water ? data?.water + "" : "");
    setSewer(data?.sewer ? data?.sewer + "" : "");
    setGarbage(data?.garbage ? data?.garbage + "" : "");
    setElectric(data?.electric ? data?.electric + "" : "");
    setGas(data?.gas ? data?.gas + "" : "");
    setHoa(data?.hoa ? data?.hoa + "" : "");
    setLot(data?.lot ? data?.lot + "" : "");
    setVacancy(data?.vacancy ? data?.vacancy + "" : "");
    setRepairs(data?.repairs ? data?.repairs + "" : "");
    setCapex(data?.capex ? data?.capex + "" : "");
    setManagement(data?.management ? data?.management + "" : "");
    setMortgage(data?.mortgage ? data?.mortgage + "" : "");
  }

  /**
   * Method to return the search criteria back to the source data.
   * @param searchData
   */
  function setCriteriaData(searchData: SEARCH) {
    setCity(searchData?.city + "");
    setZip(searchData?.zip + "");
    setState(searchData?.state + "");

    setBeds(searchData?.beds + "");
    setMaxBath(searchData?.maxBath + "");
    setMinBath(searchData?.minBath + "");
  }

  useEffect(() => {
    if (data) {
      const searchData = data?.search;
      if (searchData) {
        setExpenseData(searchData?.expenseFk);
        setCriteriaData(searchData);
      }
    }
  }, [data]);

  /**
   * Method to switch the edit mode to alter criteria.
   */
  const toggleCriteriaEditMode = () => {
    setEditModeCriteria(true);
  };

  /**
   * Method to switch the edit mode to alter an expense.
   */
  const toggleExpenseEditMode = () => {
    setEditModeExpense(true);
  };

  /**
   * Method to handle changes in beds.
   * @param value
   */
  const onBedsChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsBedsValid(true);
    } else {
      setIsBedsValid(false);
    }
    setBeds(value + "");
  };

  /**
   * Method to handle max bath changes.
   * @param value
   */
  const onMaxBathChanged = (value: number) => {
    const minBathInt = parseInt(minBath);
    if (
      (isPositive(value) && isWholeNum(value) && minBathInt <= value) ||
      value === 0
    ) {
      setIsMaxBathValid(true);
      setIsMinBathValid(true);
    } else {
      setIsMaxBathValid(false);
    }
    setMaxBath(value + "");
  };

  const onMinBathChanged = (value: number) => {
    const maxBathInt = parseInt(maxBath);
    if (
      (isPositive(value) && isWholeNum(value) && value <= maxBathInt) ||
      value === 0
    ) {
      setIsMaxBathValid(true);
      setIsMinBathValid(true);
    } else {
      setIsMinBathValid(false);
    }
    setMinBath(value + "");
  };

  const onTaxesChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsTaxValid(true);
    } else {
      setIsTaxValid(false);
    }
    setTaxes(value + "");
  };

  const onInsuranceChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsInsuranceValid(true);
    } else {
      setIsInsuranceValid(false);
    }
    setInsurance(value + "");
  };

  const onWaterChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsWaterValid(true);
    } else {
      setIsWaterValid(false);
    }
    setWater(value + "");
  };

  const onSewerChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsSewerValid(true);
    } else {
      setIsSewerValid(false);
    }
    setSewer(value + "");
  };

  const onGarbageChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsGarbageValid(true);
    } else {
      setIsGarbageValid(false);
    }
    setGarbage(value + "");
  };

  const onElectricChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsElectricValid(true);
    } else {
      setIsElectricValid(false);
    }
    setElectric(value + "");
  };

  const onGasChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsGasValid(true);
    } else {
      setIsGasValid(false);
    }
    setGas(value + "");
  };

  const onHoaChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsHoaValid(true);
    } else {
      setIsHoaValid(false);
    }
    setHoa(value + "");
  };

  const onLotChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsLotValid(true);
    } else {
      setIsLotValid(false);
    }
    setLot(value + "");
  };

  const onVacancyChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsVacancyValid(true);
    } else {
      setIsVacancyValid(false);
    }
    setVacancy(value + "");
  };

  const onRepairsChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsRepairsValid(true);
    } else {
      setIsRepairsValid(false);
    }
    setRepairs(value + "");
  };

  const onCapexChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsCapexValid(true);
    } else {
      setIsCapexValid(false);
    }
    setCapex(value + "");
  };

  const onManagementChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsManagementValid(true);
    } else {
      setIsManagementValid(false);
    }
    setManagement(value + "");
  };

  const onMortgageChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsMortgageValid(true);
    } else {
      setIsMortgageValid(false);
    }
    setMortgage(value + "");
  };

  const onSearchCriteriaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const invalidFields = getInvalidFields();
    if (invalidFields && invalidFields.length) {
      const invalidStr = invalidFields.join(", ");
      window.alert(`The following fields are invalid: ${invalidStr}`);
      return;
    }

    console.debug("Submitting search criteria.");
    await updateSearchCriteria({
      variables: {
        search: {
          id: data?.search.id,
          city: city,
          state: state,
          expenseFk: {
            id: data?.search?.expenseFk?.id,
            taxes: parseInt(taxes, 10),
            insurance: parseInt(insurance, 10),
            water: parseInt(water, 10),
            sewer: parseInt(sewer, 10),
            garbage: parseInt(garbage, 10),
            electric: parseInt(electric, 10),
            gas: parseInt(gas, 10),
            hoa: parseInt(hoa, 10),
            lot: parseInt(lot, 10),
            vacancy: parseInt(vacancy, 10),
            repairs: parseInt(repairs, 10),
            capex: parseInt(capex, 10),
            management: parseInt(management, 10),
            mortgage: parseInt(mortgage, 10),
          },
          zip: zip,
          user: data?.search?.user,
          beds: parseInt(beds, 10),
          minBath: parseInt(minBath, 10),
          maxBath: parseInt(maxBath, 10),
        },
      },
    });

    if (updateCriteriaError) {
      window.alert(updateCriteriaError.message);
    }

    setEditModeCriteria(false);
  };

  const getInvalidFields = () => {
    const invalidFields = [];
    if (!isBedsValid) {
      invalidFields.push("Beds");
    }
    if (!isMaxBathValid) {
      invalidFields.push("Max Baths");
    }
    if (!isMinBathValid) {
      invalidFields.push("Minimum Baths");
    }
    if (!isTaxValid) {
      invalidFields.push("Taxes");
    }
    if (!isInsuranceValid) {
      invalidFields.push("Insurance");
    }
    if (!isWaterValid) {
      invalidFields.push("Water");
    }
    if (!isSewerValid) {
      invalidFields.push("Sewer");
    }
    if (!isGarbageValid) {
      invalidFields.push("Garbage");
    }
    if (!isElectricValid) {
      invalidFields.push("Electric");
    }
    if (!isGasValid) {
      invalidFields.push("Gas");
    }
    if (!isHoaValid) {
      invalidFields.push("HOA");
    }
    if (!isLotValid) {
      invalidFields.push("Lot");
    }
    if (!isVacancyValid) {
      invalidFields.push("Vacancy");
    }
    if (!isRepairsValid) {
      invalidFields.push("Repairs");
    }
    if (!isCapexValid) {
      invalidFields.push("Capex");
    }
    if (!isManagementValid) {
      invalidFields.push("Management");
    }
    if (!isMortgageValid) {
      invalidFields.push("Mortgage");
    }
    return invalidFields;
  };

  const onExpenseSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.debug("Submitting expense data.");

    const invalidFields = getInvalidFields();
    if (invalidFields && invalidFields.length) {
      const invalidStr = invalidFields.join(", ");
      window.alert(`The following fields are invalid: ${invalidStr}`);
      return;
    }

    const id = data?.search?.expenseFk?.id;
    if (id) {
      await updateExpense({
        variables: {
          expense: {
            id: id,
            taxes: parseInt(taxes, 10),
            insurance: parseInt(insurance, 10),
            water: parseInt(water, 10),
            sewer: parseInt(sewer, 10),
            garbage: parseInt(garbage, 10),
            electric: parseInt(electric, 10),
            gas: parseInt(gas, 10),
            hoa: parseInt(hoa, 10),
            lot: parseInt(lot, 10),
            vacancy: parseInt(vacancy, 10),
            repairs: parseInt(repairs, 10),
            capex: parseInt(capex, 10),
            management: parseInt(management, 10),
            mortgage: parseInt(mortgage, 10),
          },
        },
      });
      if (updateExpenseError) {
        window.alert(updateCriteriaError?.message);
      }
    } else {
      //We are adding new expense info to a search criteria obj.
      await updateSearchCriteria({
        variables: {
          search: {
            id: data?.search.id,
            city: city,
            state: state,
            expenseFk: {
              taxes: parseInt(taxes, 10),
              insurance: parseInt(insurance, 10),
              water: parseInt(water, 10),
              sewer: parseInt(sewer, 10),
              garbage: parseInt(garbage, 10),
              electric: parseInt(electric, 10),
              gas: parseInt(gas, 10),
              hoa: parseInt(hoa, 10),
              lot: parseInt(lot, 10),
              vacancy: parseInt(vacancy, 10),
              repairs: parseInt(repairs, 10),
              capex: parseInt(capex, 10),
              management: parseInt(management, 10),
              mortgage: parseInt(mortgage, 10),
            },
            zip: zip,
            user: data?.search?.user,
            beds: parseInt(beds, 10),
            minBath: parseInt(minBath, 10),
            maxBath: parseInt(maxBath, 10),
          },
        },
      });
      if (updateCriteriaError) {
        window.alert(updateCriteriaError.message);
      }
    }

    setEditModeExpense(false);
  };

  if (loading)
    return (
      <div
        className="grid grid-flow-col auto-cols-max justify-around content-center h-full"
        style={{ height: "100%" }}
      >
        <Spinner aria-label="Loading Search Detail" />
      </div>
    );
  if (error) return <div>{error.message}</div>;

  const searchData = data?.search;
  if (searchData) {
    return (
      <div className="gap-4 grid grid-cols-1 justify-around content-center">
        {editModeCriteria ? (
          <Card className="max-w">
            {/* <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">Save Successful!</div>
              <Toast.Toggle />
            </Toast> */}

            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
              <span className="shrink-0 self-center">
                {city} {state}, {zip}
              </span>
            </h5>
            <p className="grid grid-flow-col auto-cols-max justify-around content-center dark:text-white">
              Search Criteria
            </p>

            {/* {updateCriteriaLoading ? (
              <div className="grid grid-flow-col auto-cols-max justify-around content-center">
                <Spinner aria-label="Loading Search Criteria" />
              </div>
            ) : null} */}

            <form
              className="flex flex-col gap-4"
              onSubmit={onSearchCriteriaSubmit}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Beds" value="Beds" />
                </div>
                <TextInput
                  id="Beds"
                  value={beds}
                  color={!isBedsValid ? "failure" : ""}
                  placeholder="Number of Beds"
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onBedsChanged(num || 0);
                  }}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    className="dark:text-gray-300"
                    htmlFor="maxBaths"
                    color={!isMaxBathValid ? "failure" : ""}
                    value={maxBath ? `Max Baths (${maxBath})` : "Max Baths"}
                  />
                </div>
                <RangeSlider
                  id="maxBaths"
                  placeholder="Maximum Baths"
                  value={maxBath}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onMaxBathChanged(num || 0);
                  }}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    className="dark:text-gray-300"
                    htmlFor="minBaths"
                    color={!isMinBathValid ? "failure" : ""}
                    value={
                      minBath ? `Minimum Baths (${minBath})` : "Minimum Baths"
                    }
                  />
                </div>
                <RangeSlider
                  id="minBaths"
                  placeholder="Minimum Baths"
                  value={minBath}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onMinBathChanged(num || 0);
                  }}
                />
              </div>

              <div className="flex flex-row gap-2">
                <Button
                  type="button"
                  className="bg-red-600 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-800"
                  disabled={updateCriteriaLoading}
                  onClick={() => {
                    setCriteriaData(data?.search);
                    setEditModeCriteria(false);
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={updateCriteriaLoading} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <Card className="max-w" href="#">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
              <span className="shrink-0 self-center">
                {city} {state}, {zip}
              </span>
            </h5>
            <p className="grid grid-flow-col auto-cols-max justify-around content-center dark:text-white">
              Search Criteria
            </p>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Beds: {beds}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Max Baths: {maxBath}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Min Baths: {minBath}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <Button onClick={toggleCriteriaEditMode}>
              <p>Edit</p>
            </Button>
          </Card>
        )}
        {editModeExpense ? (
          <Card className="max-w">
            {/* {updateExpenseLoading ? (
              <div className="grid grid-flow-col auto-cols-max justify-around content-center">
                <Spinner aria-label="Loading Expense Data" />
              </div>
            ) : null} */}

            <form className="flex flex-col gap-4" onSubmit={onExpenseSubmit}>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
                <span className="shrink-0 self-center">Expenses</span>
              </h5>
              <p className="grid grid-flow-col auto-cols-max justify-around content-center dark:text-white">
                All expenses are on a monthly basis.
              </p>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="taxes" value="Taxes" />
                </div>
                <TextInput
                  id="taxes"
                  color={!isTaxValid ? "failure" : ""}
                  value={taxes}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onTaxesChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="insurance" value="Insurance" />
                </div>
                <TextInput
                  id="insurance"
                  color={!isInsuranceValid ? "failure" : ""}
                  value={insurance}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onInsuranceChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="water" value="Water" />
                </div>
                <TextInput
                  id="water"
                  color={!isWaterValid ? "failure" : ""}
                  value={water}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onWaterChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="sewer" value="Sewer" />
                </div>
                <TextInput
                  id="sewer"
                  color={!isSewerValid ? "failure" : ""}
                  value={sewer}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onSewerChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="garbage" value="Garbage" />
                </div>
                <TextInput
                  id="garbage"
                  color={!isGarbageValid ? "failure" : ""}
                  value={garbage}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onGarbageChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="electric" value="Electric" />
                </div>
                <TextInput
                  id="electric"
                  color={!isElectricValid ? "failure" : ""}
                  value={electric}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onElectricChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="gas" value="Gas" />
                </div>
                <TextInput
                  id="gas"
                  color={!isGasValid ? "failure" : ""}
                  value={gas}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onGasChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="hoa" value="HOA" />
                </div>
                <TextInput
                  id="hoa"
                  color={!isHoaValid ? "failure" : ""}
                  value={hoa}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onHoaChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lot" value="Lot" />
                </div>
                <TextInput
                  id="lot"
                  color={!isLotValid ? "failure" : ""}
                  value={lot}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onLotChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="vacancy" value="Vacancy" />
                </div>
                <TextInput
                  id="vacancy"
                  color={!isVacancyValid ? "failure" : ""}
                  value={vacancy}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onVacancyChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="repairs" value="Repairs" />
                </div>
                <TextInput
                  id="repairs"
                  color={!isRepairsValid ? "failure" : ""}
                  value={repairs}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onRepairsChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="capex" value="Capex" />
                </div>
                <TextInput
                  id="capex"
                  color={!isCapexValid ? "failure" : ""}
                  value={capex}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onCapexChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="management" value="Management" />
                </div>
                <TextInput
                  id="management"
                  color={!isManagementValid ? "failure" : ""}
                  value={management}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onManagementChanged(num || 0);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="mortgage" value="Mortgage" />
                </div>
                <TextInput
                  id="mortgage"
                  color={!isMortgageValid ? "failure" : ""}
                  value={mortgage}
                  required
                  onChange={(e) => {
                    const value = e.target?.value;
                    const num = parseInt(value, 10);
                    onMortgageChanged(num || 0);
                  }}
                />
              </div>

              <div className="flex flex-row gap-2">
                <Button
                  type="button"
                  className="bg-red-600 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-800"
                  disabled={updateExpenseLoading}
                  onClick={() => {
                    setEditModeExpense(false);
                    setExpenseData(data?.search?.expenseFk);
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={updateExpenseLoading} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <Card className="max-w" href="#">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
              <span className="shrink-0 self-center">
                {city} {state}, {zip}
              </span>
            </h5>
            <p className="grid grid-flow-col auto-cols-max justify-around content-center dark:text-white">
              Typical Expenses
            </p>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Taxes: ${taxes || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Insurance: ${insurance || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Water: ${water || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Sewer: ${sewer || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Garbage: ${garbage || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Electric: ${electric || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Gas: ${gas || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Hoa: ${hoa || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Lot: ${lot || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Vacancy: ${vacancy || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Repairs: ${repairs || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Capex: ${capex || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Management: ${management || 0}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Mortgage: ${mortgage || 0}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <Button onClick={toggleExpenseEditMode}>
              <p>Edit</p>
            </Button>
          </Card>
        )}
      </div>
    );
  } else {
    return (
      <div className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        Sorry. We couldn't retrieve your search details... Please try again
        later. If this problem persist, please file a ticket{" "}
        <a
          target={"_blank"}
          referrerPolicy={"no-referrer"}
          href={"https://github.com/jklamert/backend/issues"}
          className={
            "text-sky-600 hover:text-blue-400 underline decoration-sky-600 hover:decoration-blue-400"
          }
        >
          here
        </a>
        .
      </div>
    );
  }
}
