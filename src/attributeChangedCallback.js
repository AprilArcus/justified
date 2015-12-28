export default function(
  name, previousValue, value
) {
  if (previousValue == null) {
    console.log(
      'got a new attribute ', name,
      ' with value ', value
    );
  } else if (value == null) {
    console.log(
      'somebody removed ', name,
      ' its value was ', previousValue
    );
  } else {
    console.log(
      name,
      ' changed from ', previousValue,
      ' to ', value
    );
  }
}
