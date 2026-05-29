import React from 'react';
import '@testing-library/jest-dom';

import { describe, it, expect } from "@jest/globals";
import MainHeading from "../components/MainHeading";
import { render, screen } from "@testing-library/react";

describe('Main heading component', () => {
    it('Display correctly the title and text value', () => {
        render(
            <MainHeading 
                titleValue="Analytics"
                text="Discover your results in a simple way"
            />
        )

        expect(screen.getByText('Analytics')).toBeInTheDocument();
        expect(screen.getByText('Discover your results in a simple way')).toBeInTheDocument();
    })
})