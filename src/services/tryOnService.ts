/**
 * Virtual Try-On Service Interface
 * 
 * Future API Integration Readiness:
 * This module isolates virtual try-on computation from the UI.
 * Later, this function will connect to a backend endpoint (e.g. FASHN or a custom diffusion pipeline).
 * No frontend API keys or sensitive credentials are stored here.
 */

export interface TryOnGenerationParams {
  sareeImage: string;
  customerImage: string;
  productCode?: string;
}

export interface TryOnResultResponse {
  success: boolean;
  resultImageUrl: string;
  metadata: {
    processingTimeMs: number;
    provider: 'local-demo-pipeline' | 'fashn-api' | 'cloud-vton';
    timestamp: string;
    isSimulation: boolean;
  };
}

/**
 * Generate virtual try-on preview
 * Currently returns predefined sample outputs matching the showroom dataset.
 */
export async function generateTryOn(
  sareeImage: string,
  _customerImage: string,
  sampleResultFallback: string = '/demo/tryon-result.png'
): Promise<TryOnResultResponse> {
  const startTime = Date.now();

  // Simulated asynchronous generation pipeline
  // Allows UI to orchestrate progressive stage updates
  await new Promise((resolve) => setTimeout(resolve, 3600));

  // If specific second test saree is used, map to tryon-result-2
  let finalResult = sampleResultFallback;
  if (sareeImage.includes('saree-sample-2')) {
    finalResult = '/demo/tryon-result-2.png';
  }

  return {
    success: true,
    resultImageUrl: finalResult,
    metadata: {
      processingTimeMs: Date.now() - startTime,
      provider: 'local-demo-pipeline',
      timestamp: new Date().toISOString(),
      isSimulation: true,
    },
  };
}
