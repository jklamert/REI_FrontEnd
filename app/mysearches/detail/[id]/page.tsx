"use client";

import { isPositive, isWholeNum } from "#app/_utils/validators";
import ActualSidebar from "#components/actualSidebar";
import Header from "#components/header";
import { gql, TypedDocumentNode, useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
// import {getClient} from "#app/context/ApolloClient";

type EXPENSE = {
  id: number;
  taxes: number;
  insurance: number;
  water: number;
  sewer: number;
  garbage: number;
  electric: number;
  gas: number;
  hoa: number;
  lot: number;
  vacancy: number;
  repairs: number;
  capex: number;
  management: number;
  mortgage: number;
};

type SEARCH = {
  id: string;
  city: string;
  state: string;
  expenseFk: EXPENSE;
  zip: string;
  user: number;
  beds: number;
  minBath: number;
  maxBath: number;
  type: string;
  props: string;
  key: string;
};

type EXPENSE_MUTATION_RESPONSE = {
  code: number;
  success: boolean;
  message: string;
  expense: EXPENSE;
};

const SEARCH_QUERY: TypedDocumentNode<{
  search: SEARCH;
}> = gql`
  query Query($id: Int) {
    search(id: $id) {
      id
      city
      state
      expenseFk {
        id
        taxes
        insurance
        water
        sewer
        garbage
        electric
        gas
        hoa
        lot
        vacancy
        repairs
        capex
        management
        mortgage
      }
      zip
      user
      beds
      minBath
      maxBath
    }
  }
`;

const EXPENSE_MUTATION: TypedDocumentNode<{
  expense: EXPENSE_MUTATION_RESPONSE;
}> = gql`
  mutation Mutation($expense: ExpenseInput!) {
    addExpense(expense: $expense) {
      code
      success
      message
      expense {
        id
        taxes
        insurance
        water
        sewer
        garbage
        electric
        gas
        hoa
        lot
        vacancy
        repairs
        capex
        management
        mortgage
      }
    }
  }
`;

type searchDetailProps = {
  id: number;
};

export default function Index(props: searchDetailProps): JSX.Element {
  const { id } = props;
  return (
    <div>
      <Header activeNav={-1} />
      <div className="flex dark:bg-gray-900">
        <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
          <SearchDetailPage id={id} />
        </main>
        <div className="order-1">
          <ActualSidebar />
        </div>
      </div>
    </div>
  );
}

function SearchDetailPage({ id }: searchDetailProps): JSX.Element {
  const [editModeCriteria, setEditModeCriteria] = useState(false);
  const [editModeExpense, setEditModeExpense] = useState(false);
  const [
    updateExpense,
    { expenseData, expenseMutationLoading, expenseMutationError },
  ] = useMutation(EXPENSE_MUTATION);

  // const [expense, setExpense] = useState({});
  // const [criteria, setCriteria] = useState({});

  // const onExpenseChanged = (fieldName, fieldValue) => {

  // };

  // const onCriteraChanged = (fieldName, fieldValue) => {};

  const { data, error, loading } = useQuery(SEARCH_QUERY, {
    variables: { id: 1 },
    // if the cache data from SSR is only partial, this will still trigger a network request
    fetchPolicy: "cache-first",
  });

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
  function setExpenseData(searchData: SEARCH) {
    setTaxes(searchData?.expenseFk?.taxes + "");
    setInsurance(searchData?.expenseFk?.insurance + "");
    setWater(searchData?.expenseFk?.water + "");
    setSewer(searchData?.expenseFk?.sewer + "");
    setGarbage(searchData?.expenseFk?.garbage + "");
    setElectric(searchData?.expenseFk?.electric + "");
    setGas(searchData?.expenseFk?.gas + "");
    setHoa(searchData?.expenseFk?.hoa + "");
    setLot(searchData?.expenseFk?.lot + "");
    setVacancy(searchData?.expenseFk?.vacancy + "");
    setRepairs(searchData?.expenseFk?.repairs + "");
    setCapex(searchData?.expenseFk?.capex + "");
    setManagement(searchData?.expenseFk?.management + "");
    setMortgage(searchData?.expenseFk?.mortgage + "");
  }

  /**
   * Method to return the search criteria back to the source data.
   * @param searchData
   */
  function setCriteriaData(searchData: SEARCH) {
    setCity(searchData?.city);
    setState(searchData?.state);
    setZip(searchData?.zip);
    setBeds(searchData?.beds + "");
    setMaxBath(searchData?.maxBath + "");
    setMinBath(searchData?.minBath + "");
  }

  useEffect(() => {
    if (data) {
      const searchData = data?.search;
      if (searchData) {
        setExpenseData(searchData);
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
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
      setIsMaxBathValid(true);
    } else {
      setIsMaxBathValid(false);
    }
    setMaxBath(value + "");
  };

  const onMinBathChanged = (value: number) => {
    if ((isPositive(value) && isWholeNum(value)) || value === 0) {
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

  if (loading)
    return (
      <div className="grid grid-flow-col auto-cols-max justify-around content-center">
        <Spinner aria-label="Loading Search Detail" />
      </div>
    );
  if (error) return <div>{error.message}</div>;

  const searchData = data?.search;
  if (searchData) {
    return (
      <div className="gap-4 grid grid-cols-1 justify-around content-center">
        {editModeCriteria ? (
          <Card className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
              <span className="shrink-0 self-center">
                {city} {state}, {zip}
              </span>
            </h5>
            <p className="grid grid-flow-col auto-cols-max justify-around content-center">
              Search Criteria
            </p>

            <form className="flex flex-col gap-4">
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
                  <Label htmlFor="maxBaths" value="Max Baths" />
                </div>
                <TextInput
                  id="maxBaths"
                  color={!isMaxBathValid ? "failure" : ""}
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
                  <Label htmlFor="minBaths" value="Minimum Baths" />
                </div>
                <TextInput
                  id="minBaths"
                  color={!isMinBathValid ? "failure" : ""}
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
                  className="bg-red-700"
                  onClick={() => {
                    setCriteriaData(data?.search);
                    setEditModeCriteria(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    //Submit form
                    setEditModeCriteria(false);
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <Card className="max-w-sm" href="#">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
              <span className="shrink-0 self-center">
                {city} {state}, {zip}
              </span>
            </h5>
            <p className="grid grid-flow-col auto-cols-max justify-around content-center">
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
          <Card className="max-w-sm">
            {expenseMutationLoading ? (
              <div className="grid grid-flow-col auto-cols-max justify-around content-center">
                <Spinner aria-label="Loading Search Detail" />
              </div>
            ) : null}

            <form className="flex flex-col gap-4">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
                <span className="shrink-0 self-center">Expenses</span>
              </h5>
              <p className="grid grid-flow-col auto-cols-max justify-around content-center">
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
                  className="bg-red-700"
                  onClick={() => {
                    setEditModeExpense(false);
                    setExpenseData(data?.search);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={async () => {
                    //Submit form
                    const results = await updateExpense({
                      variables: {
                        expense: {
                          id: data?.search?.expenseFk?.id,
                          taxes: taxes,
                          insurance: insurance,
                          water: water,
                          sewer: sewer,
                          garbage: garbage,
                          electric: electric,
                          gas: gas,
                          hoa: hoa,
                          lot: lot,
                          vacancy: vacancy,
                          repairs: repairs,
                          capex: capex,
                          management: management,
                          mortgage: mortgage,
                        },
                      },
                    });
                    const mutationData = results.data;
                    console.debug("Mutation Data: ", mutationData);

                    setEditModeExpense(false);
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <Card className="max-w-sm" href="#">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
              <span className="shrink-0 self-center">
                {city} {state}, {zip}
              </span>
            </h5>
            <p className="grid grid-flow-col auto-cols-max justify-around content-center">
              Typical Expenses
            </p>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Taxes: ${taxes}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Insurance: ${insurance}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Water: ${water}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Sewer: ${sewer}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Garbage: ${garbage}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Electric: ${electric}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Gas: ${gas}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Hoa: ${hoa}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Lot: ${lot}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Vacancy: ${vacancy}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Repairs: ${repairs}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Capex: ${capex}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Management: ${management}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Mortgage: ${mortgage}
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
