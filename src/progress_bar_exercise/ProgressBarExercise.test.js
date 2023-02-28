import React from 'react';
import { render, screen } from "@testing-library/react";
import Solution from "./ProgressBarExercise";

//test block
test("Start request button in the document", () => {
    // render the component on virtual dom
    render(<Solution />);

    const startBtn = screen.getByTestId("progress-start-btn");
    // //assert the expected result
    expect(startBtn).toBeInTheDocument();
});

test("Finish request button in the document", () => {
    // render the component on virtual dom
    render(<Solution />);
    const finishBtn = screen.getByTestId("progress-finish-btn");
    // //assert the expected result
    expect(finishBtn).toBeInTheDocument();
});

test("Progress bar toggle button in the document", () => {
    // render the component on virtual dom
    render(<Solution />);
    const toggleBtn = screen.getByTestId("progress-breakpoint-btn");
    // //assert the expected result
    expect(toggleBtn).toBeInTheDocument();
});

test("Caption in the document", () => {
    // render the component on virtual dom
    render(<Solution />);
    const caption = screen.getByTestId("progress-caption");
    // //assert the expected result
    expect(caption).toBeInTheDocument("Progress Bar");
});