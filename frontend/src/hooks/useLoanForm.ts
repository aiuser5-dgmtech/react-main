import { useState } from 'react';
import type { LoanRequest } from '../types/loan-types';

export function useLoanForm() {
  const [formData, setFormData] = useState<Partial<LoanRequest>>({});

  const setField = (field: keyof LoanRequest, value: unknown): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = (): void => {
    setFormData({});
  };

  const isFormValid: boolean =
    typeof formData.applicantId === 'string' &&
    formData.applicantId.trim().length > 0 &&
    typeof formData.requestedAmount === 'number' &&
    formData.requestedAmount > 0 &&
    typeof formData.creditScore === 'number' &&
    formData.creditScore > 0 &&
    typeof formData.annualIncome === 'number' &&
    formData.annualIncome > 0 &&
    typeof formData.employmentStatus === 'string' &&
    formData.employmentStatus.trim().length > 0;

  return { formData, setField, resetForm, isFormValid };
}
