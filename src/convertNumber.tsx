export default function convertNumber(value : string) {
  return (
    Math.floor((parseFloat(value) - 10) / 2)
  )
}
