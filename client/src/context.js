import { createContext } from 'react';

export const userContext = createContext({ user: null, setUser: () => { } });
export const mainContext = createContext({ currentTrip: null, setCurrentTrip: () => { } });