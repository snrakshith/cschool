const getAge = (birthDate) =>
  Math.floor(
    (Number(new Date()) - Number(new Date(birthDate).getTime())) / 3.15576e10
  );
console.log(getAge("1994-06-14"));
console.log(getAge("1997-01-30"));
// console.log(new Date("1997-01-30").getTime());
// console.log(new Date().getTime());
// console.log((new Date() - new Date("1997-01-30").getTime()) / 3.15576e10);
