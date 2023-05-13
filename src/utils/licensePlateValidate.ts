const LICENSE_PLATE_REGEX = '[A-Z]{3}[0-9][0-9A-Z]{2}'

export function licensePlateValidate(licensePlate: string) {
  return licensePlate.toUpperCase().match(LICENSE_PLATE_REGEX)
}
