import { gql, TypedDocumentNode } from "@apollo/client";

export type EXPENSE = {
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

export type SEARCH = {
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

export type EXPENSE_MUTATION_RESPONSE = {
  code: number;
  success: boolean;
  message: string;
  expense: EXPENSE;
};

export type SEARCH_MUTATION_RESPONSE = {
  code: number;
  success: boolean;
  message: string;
  search: SEARCH;
};

export const SEARCH_QUERY: TypedDocumentNode<{
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

export const SEARCH_MUTATION: TypedDocumentNode<{
  expense: SEARCH_MUTATION_RESPONSE;
}> = gql`
  mutation Mutation($search: SearchInput!) {
    updateSearch(search: $search) {
      code
      success
      message
      search {
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
  }
`;

export const EXPENSE_MUTATION: TypedDocumentNode<{
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
