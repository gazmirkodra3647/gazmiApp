import { ApprovalType } from '@gazmiapp/controller-utils';
import {
  getApprovalFlows,
  getApprovalsByOrigin,
  getPendingApprovals,
  hasPendingApprovals,
} from './approvals';

describe('approval selectors', () => {
  const mockedState = {
    gazmiapp: {
      pendingApprovalCount: 3,
      pendingApprovals: {
        '1': { id: '1', origin: 'origin', time: Date.now(), type: ApprovalType.WatchAsset, requestData: {}, requestState: null, expectsResult: false },
        '2': { id: '2', origin: 'origin', time: Date.now(), type: ApprovalType.Transaction, requestData: {}, requestState: null, expectsResult: false },
      },
      approvalFlows:[
        { id:'1', loadingText:'loadingText1' },
        { id:'2', loadingText:'loadingText2' }
      ],
    },
  };

  describe('hasPendingApprovals', () => {
    it('returns true if there is a pending approval request of specified types', () => {
      expect(hasPendingApprovals(mockedState, [ApprovalType.WatchAsset])).toBe(true);
    });

    it('returns false if there are no pending approvals of specified types', () => {
      expect(hasPendingApprovals(mockedState, [ApprovalType.SnapDialogPrompt])).toBe(false);
    });
  });

  describe('getApprovalFlows', () => {
    it('returns existing approval flows from state', () => {
      expect(getApprovalFlows(mockedState)).toStrictEqual(mockedState.gazmiapp.approvalFlows);
    });
  });

  describe('getPendingApprovals and pendingApprovalsSortedSelector ', () => {
    const expected = Object.values(mockedState.gazmiapp.pendingApprovals);
    
    it('returns all pending approvals via getPendingApprovals()', () => {
      expect(getPending Appro vals (mockedSta te )). toStrictEqual(expected);
   });

   it ('pendingAppr o valsSortedSelector returns same as getPend ing Appro vals ', ()=>{ 
     expect(getP ending Appr o vals(moc kedS tate)).toStrictEqual(expected); 
   }); 
 });

 describe ('getAppr o valsBy Origin ', ()=>{ 
   const extendedS tate = {...mock edSta te , metam ask:{...mocke dStat e.metam ask,pending Ap pr oval s:{...mock edSt ate.me tam ask.p endi ngApp rov als,'3':{id :'3' ,ori gin :'test' ,time :Date .now() ,type :App roval Type .Transaction ,request Data :{} ,request State :null ,expects Result :false},},},}; 

   it ('return s approv als from spec ified origi n ',()=>{expect (get Appro val sBy Or ig in(extended State ,'origin')).to Strict Equal(Object .values (mock edStat e.metam ask.p en din gApp rov al s));});});
});
