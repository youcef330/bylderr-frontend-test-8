import React, { useState } from "react";
import {
    addBank,
    editBank,
    deleteBank,
    setPrimaryBank,
} from "../../api/paymentPayoutApi";
import DebouncedButton from "../../utils/DebounceButton";

const holdingMockData = [];

const BankManagement = ({ data }) => {
    const [banks, setBanks] = useState(data || holdingMockData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalError, setModalError] = useState("");
    const [modalType, setModalType] = useState("");
    const [currentBank, setCurrentBank] = useState({ id: null, bank: "", last4: "" });

    const handleModalOpen = (type, bank = null) => {
        setModalType(type);
        setCurrentBank(bank || { id: null, bank: "", last4: "" });
        setIsModalOpen(true);
        setModalError("");
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setModalError("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentBank((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (modalType === "add") {
                const response = await addBank(currentBank);
                setBanks((prev) => [...prev, { ...response, status: "Secondary" }]);
            } else if (modalType === "edit") {
                await editBank(currentBank.id, currentBank);
                setBanks((prev) =>
                    prev.map((bank) => (bank.id === currentBank.id ? currentBank : bank))
                );
            }
            handleModalClose();
        } catch (err) {
            setModalError(err.message || "An error occurred while processing your request.");
        } finally {
            setLoading(false);
        }
    };

    const handleSetPrimary = async () => {
        setLoading(true);
        try {
            await setPrimaryBank(currentBank.id);
            setBanks((prev) =>
                prev.map((bank) =>
                    bank.id === currentBank.id
                        ? { ...bank, status: "Primary" }
                        : { ...bank, status: "Secondary" }
                )
            );
            handleModalClose();
        } catch (err) {
            setModalError(err.message || "An error occurred while setting the primary bank.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteBank(currentBank.id);
            setBanks((prev) => prev.filter((bank) => bank.id !== currentBank.id));
            handleModalClose();
        } catch (err) {
            setModalError(err.message || "An error occurred while deleting the bank account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow-lg p-6 w-auto h-full mx-auto border-2 mb-10">
                <h2 className="text-xl font-bold mb-10">Bank Account Management</h2>

                {/* Error */}
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="text-gray-600 font-semibold">
                                <th className="px-4 py-2 border-b text-left">Status</th>
                                <th className="px-4 py-2 border-b text-center">Bank</th>
                                <th className="px-4 py-2 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banks.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2 text-left">{item.status}</td>
                                    <td className="px-4 py-2 text-center text-green-600">
                                        {item.bank} - **** {item.last4}
                                    </td>
                                    <td className="px-4 py-2 text-center flex justify-center space-x-2">
                                        <DebouncedButton
                                            onClick={() => handleModalOpen("primary", item)}
                                            disabled={loading || item.status === "Primary"}
                                        >
                                            Set as Primary
                                        </DebouncedButton>
                                        <DebouncedButton
                                            onClick={() => handleModalOpen("edit", item)}
                                            disabled={loading}
                                        >
                                            Edit
                                        </DebouncedButton>
                                        <DebouncedButton
                                            onClick={() => handleModalOpen("remove", item)}
                                            disabled={loading}
                                        >
                                            Remove
                                        </DebouncedButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-10 flex justify-center">
                    <DebouncedButton onClick={() => handleModalOpen("add")} disabled={loading}>
                        Add New Bank Account
                    </DebouncedButton>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        {modalType === "remove" && (
                            <>
                                <h2 className="text-lg font-bold mb-4">Remove Bank Account</h2>
                                <p>Are you sure you want to remove this bank account?</p>
                                {modalError && (
                                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                                        {modalError}
                                    </div>
                                )}
                                <div className="flex justify-end space-x-4 mt-4">
                                    <DebouncedButton onClick={handleDelete} disabled={loading}>
                                        {loading ? "Removing..." : "Confirm"}
                                    </DebouncedButton>
                                    <DebouncedButton onClick={handleModalClose} disabled={loading}>
                                        Cancel
                                    </DebouncedButton>
                                </div>
                            </>
                        )}
                        {modalType === "primary" && (
                            <>
                                <h2 className="text-lg font-bold mb-4">Set as Primary Bank</h2>
                                <p>Are you sure you want to set this bank as your primary account?</p>
                                <p className="text-green-600 font-semibold mt-2">
                                    {currentBank.bank} - **** {currentBank.last4}
                                </p>
                                {modalError && (
                                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                                        {modalError}
                                    </div>
                                )}
                                <div className="flex justify-end space-x-4 mt-4">
                                    <DebouncedButton onClick={handleSetPrimary} disabled={loading}>
                                        {loading ? "Processing..." : "Confirm"}
                                    </DebouncedButton>
                                    <DebouncedButton onClick={handleModalClose} disabled={loading}>
                                        Cancel
                                    </DebouncedButton>
                                </div>
                            </>
                        )}
                        {modalType !== "remove" && modalType !== "primary" && (
                            <>
                                <h2 className="text-lg font-bold mb-4">
                                    {modalType === "add" ? "Add New Bank Account" : "Edit Bank Account"}
                                </h2>
                                {modalError && (
                                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                                        {modalError}
                                    </div>
                                )}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-1">Bank Name</label>
                                    <input
                                        type="text"
                                        name="bank"
                                        value={currentBank.bank}
                                        onChange={handleInputChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="Enter bank name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-1">Last 4 Digits</label>
                                    <input
                                        type="text"
                                        name="last4"
                                        value={currentBank.last4}
                                        onChange={handleInputChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="Enter last 4 digits"
                                        maxLength="4"
                                    />
                                </div>
                                <div className="flex justify-end space-x-4 mt-4">
                                    <DebouncedButton onClick={handleSave} disabled={loading}>
                                        {loading ? "Processing..." : "Confirm"}
                                    </DebouncedButton>
                                    <DebouncedButton onClick={handleModalClose} disabled={loading}>
                                        Cancel
                                    </DebouncedButton>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BankManagement;