export interface IModal {
  accountModal: AccountModal
  signInModal: SignInModal
}

type AccountModal = {
  createAccount: boolean
  setCreateAccount: React.Dispatch<React.SetStateAction<boolean>>
}

type SignInModal = {
  signIn: boolean
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>
}
