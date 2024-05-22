function Pagination({ indexing, changePage }) {
  // const { page: pageRequest, totalPages } = indexing;

  // const page =
  //   pageRequest > totalPages ? totalPages : pageRequest < 0 ? 1 : pageRequest;
  const page = 5;
  const totalPages = 12;

  const leftNumbers =
    page === totalPages
      ? 4
      : page === totalPages - 1
      ? 3
      : page > 2
      ? 2
      : page === 2
      ? 1
      : 0;
  const leftPages = Array.from(
    { length: leftNumbers },
    (val, ix) => page - 1 + ix * -1
  );

  const leftArrow = Boolean(leftPages.length) && (
    <li key={"LT"} className="arrow">
      <button onClick={() => changePage(page - 1)}>&lt;</button>
    </li>
  );

  const leftPagesRender = leftPages.reverse().map((num) => (
    <li key={num}>
      <button onClick={() => changePage(num)}>{num}</button>
    </li>
  ));
  const startShortcut =
    leftPages[0] > 1 ? (
      <>
        <li key={"start"}>
          <button onClick={() => changePage(1)}>1</button>{" "}
        </li>
        <li key={"Lellipsis"} className="ellipsis">
          &hellip;
        </li>
      </>
    ) : null;

  const rightNumbers =
    page === totalPages
      ? 0
      : page === totalPages - 1
      ? 1
      : page > 2
      ? 2
      : page === 2
      ? 3
      : 4;
  const rightPages = Array.from(
    { length: rightNumbers },
    (val, ix) => page + 1 + ix
  );

  const rightPagesRender = rightPages.map((num) => (
    <li key={num}>
      <button onClick={() => changePage(num)}>{num}</button>
    </li>
  ));

  const endShortcut =
    rightPages.slice(-1) < totalPages ? (
      <>
        <li key={"Rellipsis"} className="ellipsis">
          &hellip;
        </li>
        <li key={"end"}>
          <button onClick={() => changePage(totalPages)}>{totalPages}</button>
        </li>
      </>
    ) : null;

  const rightArrow = Boolean(page !== totalPages) && (
    <li key={"RT"} className="arrow">
      <button onClick={() => changePage(page + 1)}>&gt;</button>
    </li>
  );

  return (
    <ul className="pagination">
      {leftArrow}

      {startShortcut}

      {leftPagesRender}

      {<li>{page}</li>}

      {rightPagesRender}

      {endShortcut}

      {rightArrow}
    </ul>
  );
}

export default Pagination;
