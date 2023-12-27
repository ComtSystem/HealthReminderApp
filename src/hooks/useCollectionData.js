import { useEffect, useState } from 'react';

export default function useCollectionData(
  ref,
) {
  const [dataState, setDataState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);


  return [dataState, loading, errorState];
}