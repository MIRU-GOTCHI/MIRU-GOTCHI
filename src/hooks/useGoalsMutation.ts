// // src/hooks/useFirestoreMutation.ts
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { collection, addDoc, updateDoc, deleteDoc, doc, DocumentData, Timestamp } from 'firebase/firestore';
// import { db } from '../firebaseConfig'; // Firestore 인스턴스 임포트

// // 뮤테이션 페이로드 타입 정의
// interface AddPayload {
//   collectionName: string;
//   data: DocumentData;
// }

// interface UpdatePayload {
//   collectionName: string;
//   docId: string;
//   data: Partial<DocumentData>; // 부분 업데이트 가능
// }

// interface DeletePayload {
//   collectionName: string;
//   docId: string;
// }

// // 뮤테이션 타입 정의
// type FirestoreMutationPayload = AddPayload | UpdatePayload | DeletePayload;

// export const useFirestoreMutation = (
//   type: 'add' | 'update' | 'delete',
//   queryKeyToInvalidate?: string[] // 뮤테이션 성공 시 무효화할 쿼리 키
// ) => {
//   const queryClient = useQueryClient();

//   const mutationFn = async (payload: FirestoreMutationPayload) => {
//     if (type === 'add') {
//       const { collectionName, data } = payload as AddPayload;
//       // 생성 시간 자동 추가 (선택 사항)
//       return await addDoc(collection(db, collectionName), { ...data, createdAt: Timestamp.now() });
//     } else if (type === 'update') {
//       const { collectionName, docId, data } = payload as UpdatePayload;
//       // 업데이트 시간 자동 추가 (선택 사항)
//       return await updateDoc(doc(db, collectionName, docId), { ...data, updatedAt: Timestamp.now() });
//     } else if (type === 'delete') {
//       const { collectionName, docId } = payload as DeletePayload;
//       return await deleteDoc(doc(db, collectionName, docId));
//     }
//     throw new Error('Invalid Firestore mutation type');
//   };

//   return useMutation({
//     mutationFn,
//     onSuccess: () => {
//       // 뮤테이션 성공 시 지정된 쿼리 키를 무효화하여 데이터 재요청
//       if (queryKeyToInvalidate) {
//         queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
//       }
//     },
//     onError: (error: Error) => {
//       console.error(`Firestore ${type} mutation failed:`, error);
//       // 에러 처리 로직 (예: 사용자에게 알림)
//     },
//   });
// };
