// Unit test to check that the MetricSection component render correctly

// Mock statistics context
jest.mock('../context/statisticsContext', () => ({
    useStatistics: jest.fn()
}))

import React from 'react';
import '@testing-library/jest-dom';

import { describe, it, expect, jest } from "@jest/globals";
import { render, screen } from '@testing-library/react';
import MetricSection from '../components/MetricSection';
import { useStatistics } from '../context/StatisticsContext';

describe('Metric component', () => {
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