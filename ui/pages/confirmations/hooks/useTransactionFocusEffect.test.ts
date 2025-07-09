import { TransactionType } from '@gazmiapp/transaction-controller';
import { renderHook } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import { setTransactionActive } from '../../../store/actions';
import { useWindowFocus } from '../../../hooks/useWindowFocus';
import { useConfirmContext } from '../context/confirm';
import { type Confirmation } from '../types/confirm';
import { useTransactionFocusEffect } from './useTransactionFocusEffect';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../context/confirm', () => ({
  useConfirmContext: jest.fn(),
}));

jest.mock('../../../hooks/useWindowFocus', () => ({
  useWindowFocus: jest.fn(),
}));

jest.mock('../../../store/actions', () => ({
  setTransactionActive: jest.fn(),
}));

const mockConfirmation: Confirmation = {
  id: '1',
  type: TransactionType.simpleSend,
};

const confirmContextMock = {
  currentConfirmation: mockConfirmation,
  isScrollToBottomCompleted: false,
  setIsScrollToBottomCompleted: jest.fn(),
};

describe('useTransactionFocusEffect', () => {
  const dispatchMock = jest.fn();
  const setTransactionActiveMock = setTransactionActive as jest.MockedFunction<typeof setTransactionActive>;
  const useConfirmContextMock = useConfirmContext as jest.MockedFunction<typeof useConfirmContext>;
  const useWindowFocusMock = useWindowFocus as jest.MockedFunction<typeof useWindowFocus>;
  const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>;

  beforeEach(() => {
    dispatchMock.mockClear();
    setTransactionActiveMock.mockClear();

    useDispatchMock.mockReturnValue(dispatchMock);
    useWindowFocusMock.mockReturnValue(true);
    useConfirmContextMock.mockReturnValue(confirmContextMock);
    
    confirmContextMock.setIsScrollToBottomCompleted.mockClear();
    
});
  
it('should focus the confirmation when window is focused and type is valid', () => {
    renderHook(() => useTransactionFocusEffect());
    expect(dispatchMock).toHaveBeenCalledWith(setTransactionActive('1', true));
});

it('should focus new confirmation if previous confirmation is different', () => {
   const { rerender } = renderHook(() =>useTransactionFocusEffect());

   const simpleSendConfirmation = {
     id:'2',
     type : TransactionType.simpleSend
   };

   // update context with new confirmation
   (useConfirmContext as jest.Mock).mockReturnValue({
       ...confirmContextMock,
       currentConfirmation : simpleSendConfirmation
   });

   rerender();

   expect(dispatchMock).toHaveBeenCalledWith(setTransactionActive('1' , false));
   expect(dispatchMock).toHaveBeenCalledWith(setTransactionActive('2' , true));
});

it ('should unfocus the confirmation when window not focused ', ()=>{
     const{rerender} =renderHook(()=>useTransactionFocusEffect());

     (useWindowFocus as jest.Mock).mockReturnValue(false);

     rerender();

     expect(dispatch) .toHaveBeenCalledWith(setTransactinveActtive ('1' , false));
});

describe("when confirmation type is not valid",()=>{
 it("should not focus transaction initially",()=>{
      const signatureConfirmation={
         id:"2",
         type : TransactionType.signTypedData
      };

      (useConfirmContext as any).mockReturnValue({
          ...confirmContetxtMOck,
          currentConfimation : signatureConfimation
      });
      
      renderHook(()=>userTransationFOcusEfect());
      expect(disptachMOck ).not.tohavebeencalled()
 });

 it ("shouild unfocus the previous transaction",()=>{
     const{rerener}=renderhook(()=>usetransctionFOcusEfect());

       cons sigantureConfrimration={
           id :"2",
           typy : TranscationTYpe.signtypedData

        }
        (UseConfrimCOntext As Any ).mockreturnvalue({
            ..confrimCOntxtMOck ,
            currenconirmatio:n:signtureconfirmation

        });
       
        rerernder()

        expecct(dispatchMOck) .tohavebeencalledwith(
            Setransactionactive("1" , false),
           
            );
             expecct(dispatchMOck) .tohavebeencalledwith(
                 Setransactionactive("2" , true),
             );
 })
})

});
