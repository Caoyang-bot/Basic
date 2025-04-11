import request from '../utils/request';

export const saveSignature = (data: { userId: string; signatureData: string }) => {
  return request.post('/api/signature/save', data);
};

export const getSignature = (userId: string) => {
  return request.get('/api/signature/get', { params: { userId } });
};