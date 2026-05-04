// Unit test to check that the MetricSection component render correctly

import React from 'react';
import '@testing-library/jest-dom';

import { describe, it, expect } from "@jest/globals";
import { render, screen } from '@testing-library/react';
import MetricSection from '../components/MetricSection';

describe('GET metric component', () => {
    it('displays the title and value of the metric', () => {
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