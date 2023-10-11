"use client";

import { ADD_SEARCH_MUTATION, SEARCH_MUTATION } from "#app/_types/allTypes";
import { isPositive, isValidZip, isWholeNum } from "#app/_utils/validators";
import ActualSidebar from "#components/actualSidebar";
import Header from "#components/header";
import { useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Label,
  RangeSlider,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Index(): JSX.Element {
  return (
    <div>
      <Header activeNav={-1} />
      <div className="flex dark:bg-gray-900">
        <main
          style={{ height: "100%" }}
          className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]"
        >
          <SearchDetailPage />
        </main>
        <div className="order-1">
          <ActualSidebar />
        </div>
      </div>
    </div>
  );
}

function SearchDetailPage(): JSX.Element {
  const [
    addNewSearch,
    { loading: addNewSearchLoading, error: addNewSearchError },
  ] = useMutation(ADD_SEARCH_MUTATION);

  const [
    updateSearch,
    { loading: updateSearchLoading, error: updateSearchError },
  ] = useMutation(SEARCH_MUTATION);

  //Next router
  const router = useRouter();

  //Search Criteria State
  const [recordId, setRecordId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [isZipValid, setIsZipValid] = useState(true);

  const [beds, setBeds] = useState("");
  const [isBedsValid, setIsBedsValid] = useState(true);

  const [maxBath, setMaxBath] = useState("");
  const [isMaxBathValid, setIsMaxBathValid] = useState(true);

  const [minBath, setMinBath] = useState("");
  const [isMinBathValid, setIsMinBathValid] = useState(true);

  //Expense State
  const [expenseId, setExpenseId] = useState("");
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

  const [step, setStep] = useState(1);

  /**
   * Method to handle changes in beds.
   * @param value
   */
  const onCityChanged = (value: string) => {
    setCity(value);
  };

  /**
   * Method to handle changes in beds.
   * @param value
   */
  const onStateChanged = (value: string) => {
    setState(value);
  };

  /**
   * Method to handle changes in beds.
   * @param value
   */
  const onZipChanged = (value: string) => {
    if (isValidZip(value)) {
      setIsZipValid(true);
    } else {
      setIsZipValid(false);
    }
    setZip(value);
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
      (isPositive(value) && isWholeNum(value) && value >= minBathInt) ||
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
      setIsMinBathValid(true);
      setIsMaxBathValid(true);
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

  const onSearchCriteriaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.debug("Submitting search criteria.");
    //If the record has been saved then we are on step one.
    //We need to save the search criteria initially.
    const invalidFields = getInvalidFields();
    if (invalidFields && invalidFields.length) {
      const invalidStr = invalidFields.join(", ");
      window.alert(`The following fields are invalid: ${invalidStr}`);
      return;
    }

    if (recordId) {
      const mutationData = await updateSearch({
        variables: {
          search: {
            id: parseInt(recordId, 10),
            city: city,
            state: state,
            expenseFk: {
              id: parseInt(expenseId, 10),
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
            user: 1,
            beds: parseInt(beds, 10),
            minBath: parseInt(minBath, 10),
            maxBath: parseInt(maxBath, 10),
          },
        },
      });

      if (updateSearchError) {
        window.alert(updateSearchError?.message);
      }

      setBeds((mutationData?.data?.updateSearch?.search?.beds || "") + "");
      setState((mutationData?.data?.updateSearch?.search?.state || "") + "");
      setMaxBath(
        (mutationData?.data?.updateSearch?.search?.maxBath || "") + ""
      );
      setMinBath(
        (mutationData?.data?.updateSearch?.search?.minBath || "") + ""
      );
      setZip((mutationData?.data?.updateSearch?.search?.zip || "") + "");
      setCity((mutationData?.data?.updateSearch?.search?.city || "") + "");
      setRecordId((mutationData?.data?.updateSearch?.search?.id || "") + "");

      setTaxes(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.taxes || "") + ""
      );
      setInsurance(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.insurance || "") +
          ""
      );
      setWater(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.water || "") + ""
      );
      setSewer(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.sewer || "") + ""
      );
      setGarbage(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.garbage || "") +
          ""
      );
      setElectric(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.electric || "") +
          ""
      );
      setGas(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.gas || "") + ""
      );
      setHoa(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.hoa || "") + ""
      );
      setLot(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.lot || "") + ""
      );
      setVacancy(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.vacancy || "") +
          ""
      );
      setRepairs(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.repairs || "") +
          ""
      );
      setCapex(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.capex || "") + ""
      );
      setManagement(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.management ||
          "") + ""
      );
      setMortgage(
        (mutationData?.data?.updateSearch?.search?.expenseFk?.mortgage || "") +
          ""
      );

      //The second step save is complete. Route them back to their searches.
      router.push("/searches");
    } else {
      const mutationData = await addNewSearch({
        variables: {
          search: {
            id: null,
            city: city,
            state: state,
            expenseFk: {
              id: null,
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
            user: 1,
            beds: parseInt(beds, 10),
            minBath: parseInt(minBath, 10),
            maxBath: parseInt(maxBath, 10),
          },
        },
      });
      if (addNewSearchError) {
        window.alert(addNewSearchError?.message);
      }

      setBeds((mutationData?.data?.addSearch?.search?.beds || "") + "");
      setState((mutationData?.data?.addSearch?.search?.state || "") + "");
      setMaxBath((mutationData?.data?.addSearch?.search?.maxBath || "") + "");
      setMinBath((mutationData?.data?.addSearch?.search?.minBath || "") + "");
      setZip((mutationData?.data?.addSearch?.search?.zip || "") + "");
      setCity((mutationData?.data?.addSearch?.search?.city || "") + "");
      setRecordId((mutationData?.data?.addSearch?.search?.id || "") + "");

      setTaxes(
        (mutationData?.data?.addSearch?.search?.expenseFk?.taxes || "") + ""
      );
      setInsurance(
        (mutationData?.data?.addSearch?.search?.expenseFk?.insurance || "") + ""
      );
      setWater(
        (mutationData?.data?.addSearch?.search?.expenseFk?.water || "") + ""
      );
      setSewer(
        (mutationData?.data?.addSearch?.search?.expenseFk?.sewer || "") + ""
      );
      setGarbage(
        (mutationData?.data?.addSearch?.search?.expenseFk?.garbage || "") + ""
      );
      setElectric(
        (mutationData?.data?.addSearch?.search?.expenseFk?.electric || "") + ""
      );
      setGas(
        (mutationData?.data?.addSearch?.search?.expenseFk?.gas || "") + ""
      );
      setHoa(
        (mutationData?.data?.addSearch?.search?.expenseFk?.hoa || "") + ""
      );
      setLot(
        (mutationData?.data?.addSearch?.search?.expenseFk?.lot || "") + ""
      );
      setVacancy(
        (mutationData?.data?.addSearch?.search?.expenseFk?.vacancy || "") + ""
      );
      setRepairs(
        (mutationData?.data?.addSearch?.search?.expenseFk?.repairs || "") + ""
      );
      setCapex(
        (mutationData?.data?.addSearch?.search?.expenseFk?.capex || "") + ""
      );
      setManagement(
        (mutationData?.data?.addSearch?.search?.expenseFk?.management || "") +
          ""
      );
      setMortgage(
        (mutationData?.data?.addSearch?.search?.expenseFk?.mortgage || "") + ""
      );
    }
  };

  if (addNewSearchLoading)
    return (
      <div
        className="grid grid-flow-col auto-cols-max justify-around content-center h-full"
        style={{ height: "100%" }}
      >
        <Spinner aria-label="Loading Search Detail" />
      </div>
    );
  if (addNewSearchError) return <div>{addNewSearchError.message}</div>;

  if (!recordId) {
    return (
      <div className="gap-4 grid grid-cols-1 justify-around content-center">
        <Card className="max-w">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
            <span className="shrink-0 self-center">
              {city && state && zip ? `${city} ${state} , ${zip}` : null}
            </span>
          </h5>
          <p className="grid grid-flow-col auto-cols-max justify-around content-center dark:text-white">
            Enter Your Search Criteria
          </p>

          <form
            className="flex flex-col gap-4"
            onSubmit={onSearchCriteriaSubmit}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="City" value="City" />
              </div>
              <TextInput
                type="city"
                id="City"
                value={city}
                placeholder="City"
                required
                onChange={(e) => {
                  const value = e.target?.value;
                  onCityChanged(value);
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="State" value="State" />
              </div>
              <TextInput
                id="State"
                value={state}
                placeholder="State"
                required
                onChange={(e) => {
                  const value = e.target?.value;
                  onStateChanged(value);
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Zip" value="ZIP" />
              </div>
              <TextInput
                id="Zip"
                value={zip}
                color={!isZipValid ? "failure" : ""}
                placeholder="ZIP Code"
                required
                onChange={(e) => {
                  const value = e.target?.value;
                  onZipChanged(value);
                }}
              />
            </div>
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
              <div className="mb-1 block">
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
            {/* <div>
              <div className="mb-2 block">
                <Label htmlFor="maxBaths" value="Max Baths" />
              </div>
              <TextInput
                id="maxBaths"
                placeholder="Maximum Baths"
                color={!isMaxBathValid ? "failure" : ""}
                value={maxBath}
                required
                onChange={(e) => {
                  const value = e.target?.value;
                  const num = parseInt(value, 10);
                  onMaxBathChanged(num || 0);
                }}
              />
            </div> */}
            <div>
              <div className="mb-1 block">
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

            {/* <div>
              <div className="mb-2 block">
                <Label htmlFor="minBaths" value="Minimum Baths" />
              </div>
              <TextInput
                id="minBaths"
                placeholder="Minimum Baths"
                color={!isMinBathValid ? "failure" : ""}
                value={minBath}
                required
                onChange={(e) => {
                  const value = e.target?.value;
                  const num = parseInt(value, 10);
                  onMinBathChanged(num || 0);
                }}
              />
            </div> */}
            <div className="flex flex-row gap-2">
              <Button disabled={addNewSearchLoading} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="gap-4 grid grid-cols-1 justify-around content-center">
        <Card className="max-w">
          <form
            className="flex flex-col gap-4"
            onSubmit={onSearchCriteriaSubmit}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
              <span className="shrink-0 self-center">
                {city ? `${city}` : null} Expenses
              </span>
            </h5>
            <p className="grid grid-flow-col auto-cols-max justify-around content-center dark:text-white">
              Enter your monthly forcasted expenses.
            </p>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="taxes" value="Taxes" />
              </div>
              <TextInput
                id="taxes"
                placeholder="Taxes"
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
                placeholder="Insurance"
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
                placeholder="Water Bill Amount"
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
                placeholder="Sewer"
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
                placeholder="Garbage"
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
                placeholder="Electric"
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
                placeholder="Gas"
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
                placeholder="HOA"
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
                placeholder="Lot"
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
                placeholder="Vacancy"
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
                placeholder="Repairs"
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
                placeholder="Capital Expenditures"
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
                placeholder="Management Cost"
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
                placeholder="Mortgage"
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
              <Button disabled={addNewSearchLoading} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}
