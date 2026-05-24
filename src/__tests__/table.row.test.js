// Unit testing table row component

// Mock before the imports 
jest.mock('../assets/EditTradeIcon.svg', () => 'edit-icon-mock');
jest.mock('../assets/DeleteTradeIcon.svg', () => 'delete-icon-mock');

// Mock the custom hook and the functions it returns
jest.mock('../hooks/useTradeActions', () => ({
    useTradeActions: jest.fn(() => ({
        handleEditClick: jest.fn(),
        handleDeleteClick: jest.fn()
    }))
}));

// Refers to documentation on mock Link of router
jest.mock('react-router', () => ({
    Link: ({ children, ...props }) => <a {...props}>{children}</a>
}))

import React from 'react';
import '@testing-library/jest-dom';

import { describe, it, expect, jest} from "@jest/globals";
import { render, screen } from '@testing-library/react';
import TableRow from '../components/TableRow';
import { Link, MemoryRouter } from 'react-router';

describe('GET table row component', () => { 
    it('displays correctly a winning trade in the table', () => {
        render(
            <table>
                <tbody>
                    <TableRow 
                        id={1}
                        date='2026/03/30'
                        asset='NVDA'
                        direction='buy'
                        outcome='win'
                        pnl={95}
                        onTradeDeleted={jest.fn()}
                    />
                </tbody>
            </table>
        )

        expect(screen.getByText('NVDA')).toBeInTheDocument();
        expect(screen.getByText('Win')).toBeInTheDocument();
    })

    it('displays correctly a loosing trade in the table', () => {
        render (
            <table>
                <tbody>
                    <TableRow 
                        id={2}
                        date='2026/04/12'
                        asset='AMZN'
                        direction='sell'
                        outcome='loss'
                        pnl={-120}
                        onTradeDeleted={jest.fn()}
                    />
                </tbody>
            </table>
        )

        expect(screen.getByText('Loss')).toBeInTheDocument();
        expect(screen.getByText('-120 €')).toBeInTheDocument();
    })  
})