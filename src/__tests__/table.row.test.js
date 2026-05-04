// Unit testing table row component

import React from 'react';
import '@testing-library/jest-dom';

import { describe, it, expect } from "@jest/globals";
import { render, screen } from '@testing-library/react';
import TableRow from '../components/TableRow';

describe('GET table row component', () => {
    it('displays correctly a winning trade in the table', () => {
        render(
            <TableRow 
                date='2026/03/30'
                asset='NVDA'
                direction='buy'
                outcome='win'
                pnl={95}
            />
        )

        expect(screen.getByText('NVDA')).toBeInTheDocument();
        expect(screen.getByText('Win')).toBeInTheDocument();
    })

    it('displays correctly a loosing trade in the table', () => {
        render (
            <TableRow 
                date='2026/04/12'
                asset='AMZN'
                direction='sell'
                outcome='loss'
                pnl={-120}
            />
        )

        expect(screen.getByText('Loss')).toBeInTheDocument();
        expect(screen.getByText('-120 €')).toBeInTheDocument();
    })  
})