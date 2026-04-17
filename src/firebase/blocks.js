import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "./config";

const blocksCollection = (userId) =>
  collection(db, "users", userId, "blocks");

/**
 * Subscribe to all blocks for a user — real-time listener.
 * Returns an unsubscribe function.
 */
export const subscribeToBlocks = (userId, callback) => {
  const q = query(
    blocksCollection(userId),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const blocks = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(blocks);
  });
};

/**
 * Add a new block.
 */
export const addBlock = async (userId, blockData) => {
  const docRef = await addDoc(blocksCollection(userId), {
    ...blockData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

/**
 * Update a block's fields.
 */
export const updateBlock = async (userId, blockId, data) => {
  const ref = doc(db, "users", userId, "blocks", blockId);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete a block and ALL its descendants (recursive cascade).
 */
export const deleteBlock = async (userId, blockId, allBlocks) => {
  const toDelete = collectDescendantIds(blockId, allBlocks);
  toDelete.push(blockId);

  await Promise.all(
    toDelete.map((id) =>
      deleteDoc(doc(db, "users", userId, "blocks", id))
    )
  );
};

/**
 * Recursively collect all descendant IDs of a block.
 */
const collectDescendantIds = (parentId, allBlocks) => {
  const children = allBlocks.filter((b) => b.parentId === parentId);
  return children.reduce(
    (acc, child) => [
      ...acc,
      child.id,
      ...collectDescendantIds(child.id, allBlocks),
    ],
    []
  );
};
