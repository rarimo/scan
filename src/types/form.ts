export type FormProps = {
  id: string
  onSubmit: (params: { message: string }) => void
  setIsDialogDisabled: (isDisabled: boolean) => void
}
