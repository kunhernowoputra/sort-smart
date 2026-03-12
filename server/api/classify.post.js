// server/api/classify.post.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body || !body.image) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing image data',
    })
  }

  // In Phase 1, we mock the CV classification result
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 150))

  const categories = [
    { id: 1, name: 'PET Plastic', color: 'emerald', confidence: 0.98 },
    { id: 2, name: 'HDPE Plastic', color: 'blue', confidence: 0.92 },
    { id: 3, name: 'Paper', color: 'purple', confidence: 0.85 },
    { id: 4, name: 'Metal', color: 'amber', confidence: 0.75 },
    { id: 5, name: 'Organic', color: 'orange', confidence: 0.88 },
  ]

  // Pick a random category for mock results
  const result = categories[Math.floor(Math.random() * categories.length)]

  // Optional: Save to database (WasteLog) if needed for real tracking
  // const log = await db.wasteLog.create({
  //   data: {
  //     categoryId: result.id,
  //     confidence: result.confidence,
  //     line: body.line || 'LINE_A'
  //   }
  // })

  return {
    success: true,
    data: {
      category: result.name,
      confidence: result.confidence,
      color: result.color,
      timestamp: new Date().toISOString(),
      boundingBox: {
        top: 25,
        left: 35,
        width: 15,
        height: 25
      }
    }
  }
})
