export function validateStudent({ name, email, age }) {
  const errors = {}

  if (!name?.trim())
    errors.name = 'Name is required'
  else if (name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters'
  else if (name.trim().length > 80)
    errors.name = 'Name must be under 80 characters'

  if (!email?.trim())
    errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = 'Enter a valid email address'

  const ageNum = Number(age)
  if (!age && age !== 0)
    errors.age = 'Age is required'
  else if (isNaN(ageNum) || !Number.isInteger(ageNum))
    errors.age = 'Age must be a whole number'
  else if (ageNum < 10 || ageNum > 100)
    errors.age = 'Age must be between 10 and 100'

  return errors
}

export const hasErrors = (errs) => Object.keys(errs).length > 0
