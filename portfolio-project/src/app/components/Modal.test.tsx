import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';

test('renders modal when isOpen is true', () => {
    render(
        <Modal isOpen={true} onClose={() => {}} onSubmit={() => {}}>
            <div>Test content</div>
        </Modal>
    );
  
  expect(screen.getByText('Test content')).toBeInTheDocument();
});

test('unrenders modal when isOpen is false', () => {
    render(
        <Modal isOpen={false} onClose={() => {}} onSubmit={() => {}}>
            <div>Test content</div>
        </Modal>
    );
  
  expect(screen.queryByText('Test content')).toBeNull();
});

test('title displays when provided', () => {
    render(
    <Modal title='This is the title!' isOpen={true} onClose={() => {}} onSubmit={() => {}}/>
    );
  
  expect(screen.getByText('This is the title!')).toBeInTheDocument();
});

test('close button calls onClose fnc', () => {
    const testOnClose = jest.fn();

    render(
        <Modal isOpen={true} onClose={testOnClose} onSubmit={() => {}}/>
    );

    const testCloseButton = screen.getByText('×');
    fireEvent.click(testCloseButton);
  
    expect(testOnClose).toHaveBeenCalledTimes(1);
});

test('cancel button calls onClose', () => {
    const testOnClose = jest.fn();

    render(
        <Modal isOpen={true} onClose={testOnClose} onSubmit={() => {}}/>
    );

    const testCancelButton = screen.getByText('Cancel');
    fireEvent.click(testCancelButton);
  
    expect(testOnClose).toHaveBeenCalledTimes(1);
});

test('out of modal click calls onClose', () => {
    const testOnClose = jest.fn();

    render(
        <Modal isOpen={true} onClose={testOnClose} onSubmit={() => {}}/>
    );

    const testBackgroundClick = screen.getByTestId('background')
    fireEvent.click(testBackgroundClick);
  
    expect(testOnClose).toHaveBeenCalledTimes(1);
});

test('submit button calls onSubmit', () => {
    const testOnSubmit = jest.fn();

    render(
        <Modal isOpen={true} onClose={() => {}} onSubmit={testOnSubmit}/>
    );

    const testSubmitButton = screen.getByText('Submit');
    fireEvent.click(testSubmitButton);
  
    expect(testOnSubmit).toHaveBeenCalledTimes(1);
});

test('renders children elements correctly', () => {

    render(
        <Modal isOpen={true} onClose={() => {}} onSubmit={() => {}}>
            <div>
                <div>
                    <h1>these are some test...</h1>
                    <p>elements to see...</p>
                </div>
                <div>
                    <h3>that this models...</h3>
                    <ul>
                        <li>all...</li>
                        <li>elements...</li>
                        <li>correctly...</li>
                    </ul>
                </div>
            </div>
        </Modal>
    );

    expect(screen.getByText('these are some test...')).toBeInTheDocument();
    expect(screen.getByText('elements to see...')).toBeInTheDocument();
    expect(screen.getByText('that this models...')).toBeInTheDocument();
    expect(screen.getByText('all...')).toBeInTheDocument();
    expect(screen.getByText('elements...')).toBeInTheDocument();
    expect(screen.getByText('correctly...')).toBeInTheDocument();
});

test('renders modal in document.body via portal', () => {

    render(
        <Modal isOpen={true} onClose={() => {}} onSubmit={() => {}}>
            <div>Portal test content</div>
        </Modal>
    );
    
    expect(screen.getByText('Portal test content')).toBeInTheDocument();
    
    const modalElements = document.body.querySelectorAll('[data-testid="background"]');
    expect(modalElements.length).toBeGreaterThan(0);
});
