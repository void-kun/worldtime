const tbl = document.querySelectorAll('.table tbody tr');
const countryTZ = Array.from(tbl).map((tr) => {
  const ele = Array.from(tr.querySelectorAll('td'));
  return {
    UTCName: ele[0].innerText,
    TimeZone: ele[1].innerText,
    Country: ele[2].innerText,
    Cities: ele[3].innerText.split(', '),
  };
});

console.log(JSON.stringify(countryTZ));
