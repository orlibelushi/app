import useCheckout from "#/app/cart/hooks/use-checkout";
import { Step } from "../../../components/checkout/types";
import TransactionStatus from "../../../components/checkout/transaction-status";
import { SelectChainCard } from "../../../components/checkout/select-chain-card";
import InitiateActionsCard from "../../../components/checkout/initiate-actions-card";
import ClaimPoapModal from "#/components/checkout/claim-poap-modal";

interface CheckoutProps {
  setOpen: (open: boolean) => void;
  hasCreatedEfpList?: boolean;
}

const Checkout: React.FC<CheckoutProps> = ({ setOpen, hasCreatedEfpList }) => {
  const {
    chains,
    actions,
    poapLink,
    onFinish,
    poapLoading,
    currentStep,
    openPoapModal,
    selectedChain,
    handleNextStep,
    setCurrentStep,
    handleChainClick,
    handleNextAction,
    claimPoapModalOpen,
    setNewListAsPrimary,
    setClaimPoapModalOpen,
    handleInitiateActions,
    setSetNewListAsPrimary,
  } = useCheckout();

  return (
    <div>
      {claimPoapModalOpen && (
        <ClaimPoapModal
          onClose={() => setClaimPoapModalOpen(false)}
          link={poapLink}
          isLoading={poapLoading}
        />
      )}
      <div className="flex glass-card gap-5 bg-neutral/40 flex-col mt-28 mb-4 w-full sm:w-[552px] items-center border-[3px] border-grey text-center justify-between rounded-xl p-6 py-8 sm:p-14">
        {currentStep === Step.SelectChain && (
          <SelectChainCard
            chains={chains}
            isCreatingNewList={!hasCreatedEfpList}
            onCancel={() => setOpen(false)}
            handleChainClick={handleChainClick}
            selectedChain={selectedChain}
            handleNextStep={handleNextStep}
            setNewListAsPrimary={setNewListAsPrimary}
            setSetNewListAsPrimary={setSetNewListAsPrimary}
          />
        )}
        {currentStep === Step.InitiateTransactions && (
          <InitiateActionsCard
            actions={actions}
            onCancel={() => setOpen(false)}
            setCurrentStep={setCurrentStep}
            handleInitiateActions={handleInitiateActions}
          />
        )}
        {currentStep === Step.TransactionStatus && (
          <TransactionStatus
            onFinish={onFinish}
            openPoapModal={openPoapModal}
            setCurrentStep={setCurrentStep}
            handleNextAction={handleNextAction}
            handleReInitiateActions={handleInitiateActions}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
