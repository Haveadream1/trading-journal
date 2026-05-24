// Unit test to check that the MetricSection component render correctly

import React from 'react';
import '@testing-library/jest-dom';

import { describe, it, expect, jest } from "@jest/globals";
import { render, screen } from '@testing-library/react';
import MetricSection from '../components/MetricSection';
import { useStatistics } from '../data/StatisticsContext';

// Mock statistics context
jest.mock('../data/statisticsContext', () => ({
    useStatistics: jest.fn()
}))

describe('GET metric component', () => {
    it('displays the title and value of the metric', () => {

        // Mock the value fetched from the hook
        useStatistics.mockReturnValue({
            isLoading: false
        });

        render(
            <MetricSection
                titleId='metric-heading-total-pnl'
                titleValue='Total PnL'
                text='201 €'
            />
        )

        expect(screen.getByText('Total PnL')).toBeInTheDocument();
        expect(screen.getByText('201 €')).toBeInTheDocument();
    })
})