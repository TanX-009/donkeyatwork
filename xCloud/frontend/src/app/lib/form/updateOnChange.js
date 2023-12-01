// handler for form input values
export function updateOnChange(event, form, setForm) {
  setForm({ ...form, [event.target.name]: event.target.value });
}
